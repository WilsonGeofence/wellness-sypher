
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const googleAIApiKey = Deno.env.get('GOOGLE_AI_API_KEY');
const openAIApiKey = Deno.env.get('OPENAI_API_KEY'); // Keep for backwards compatibility

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    const { message, test } = requestData;
    
    // Test endpoint to verify Google AI API key
    if (test === true) {
      console.log('Running API key test...');
      
      if (!googleAIApiKey) {
        console.error('Google AI API key not found in environment variables for test');
        return new Response(JSON.stringify({ 
          status: 'error',
          message: 'Google AI API key not configured' 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        });
      }

      try {
        // Make a minimal API call to test the key
        const testResponse = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=' + googleAIApiKey, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: "Hello, this is a test message." }]
              }
            ],
            generationConfig: {
              maxOutputTokens: 5,
            }
          }),
        });

        const responseText = await testResponse.text();
        console.log('API test response:', testResponse.status, responseText);
        
        if (!testResponse.ok) {
          return new Response(JSON.stringify({ 
            status: 'error',
            message: `API key test failed with status ${testResponse.status}: ${responseText}` 
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
          });
        }

        try {
          const data = JSON.parse(responseText);
          return new Response(JSON.stringify({ 
            status: 'success',
            message: 'Google AI API key is valid and working!',
            response: data.candidates?.[0]?.content?.parts?.[0]?.text || "Test successful"
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
          });
        } catch (jsonError) {
          return new Response(JSON.stringify({ 
            status: 'error',
            message: `Could not parse Google AI response: ${responseText}` 
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
          });
        }
      } catch (testError) {
        console.error('Google AI API test failed:', testError);
        
        return new Response(JSON.stringify({ 
          status: 'error',
          message: `Error testing API key: ${testError.message}` 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        });
      }
    }
    
    // Regular message processing
    if (!message) {
      return new Response(JSON.stringify({ 
        status: 'error',
        message: 'No message provided' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });
    }

    console.log('Received message:', message);

    // Check if the API key exists and log more detailed information
    if (!googleAIApiKey) {
      console.error('Google AI API key not found in environment variables');
      
      // Return a specific response for missing API key
      return new Response(JSON.stringify({ 
        status: 'error',
        message: 'Google AI API key not configured',
        response: "I'm sorry, but I can't connect to my knowledge base right now. The system administrator needs to set up the Google AI API key. In the meantime, please remember that consistent monitoring of blood glucose levels, staying hydrated, and maintaining a balanced diet are key aspects of diabetes management." 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });
    }

    try {
      // Call the Google AI Gemini API
      const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=' + googleAIApiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ 
                text: "You are Sypher, a health and wellness AI assistant. Provide helpful, concise advice about sleep, nutrition, exercise, and stress management. Your responses should be friendly, evidence-based, and focused on promoting overall wellbeing. Limit responses to 2-3 paragraphs at most. USER QUERY: " + message 
              }]
            }
          ],
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.7
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Google AI API error:', response.status, errorData);
        
        // Check if it's a rate limit error
        if (response.status === 429) {
          return new Response(JSON.stringify({ 
            status: 'error',
            message: 'Rate limit exceeded',
            response: "I'm currently experiencing high demand and couldn't process your request. Please try again in a few moments. For diabetes management, remember to monitor blood glucose regularly, stay hydrated, and maintain a consistent meal schedule. If you have any urgent concerns, please consult your healthcare provider." 
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
          });
        }
        
        return new Response(JSON.stringify({ 
          status: 'error',
          message: `Google AI API error: ${response.status} - ${errorData}`,
          response: "I apologize, but I'm having trouble connecting to my knowledge base right now. For diabetes management, it's important to monitor your blood glucose levels regularly, maintain a consistent meal schedule, stay physically active, and take medications as prescribed. If you have specific concerns, please consult your healthcare provider."
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        });
      }

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, but I couldn't generate a response at this time.";

      console.log('AI Response (truncated):', aiResponse.substring(0, 100) + "...");

      return new Response(JSON.stringify({ 
        status: 'success',
        response: aiResponse 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });
    } catch (aiError) {
      console.error('Google AI API call failed:', aiError);
      
      // Provide a fallback response if API call fails
      return new Response(JSON.stringify({ 
        status: 'error',
        message: `Error: ${aiError.message}`,
        response: "I apologize, but I'm having trouble connecting to my knowledge base right now. For diabetes management, it's important to monitor your blood glucose levels regularly, maintain a consistent meal schedule, stay physically active, and take medications as prescribed. If you have specific concerns, please consult your healthcare provider." 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });
    }
  } catch (error) {
    console.error('Error in chat-ai function:', error);
    return new Response(JSON.stringify({ 
      status: 'error',
      message: error.message,
      error: error.message 
    }), {
      status: 200, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
