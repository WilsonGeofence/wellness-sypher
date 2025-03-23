
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
    
    // Test endpoint to verify OpenAI API key
    if (test === true) {
      console.log('Running API key test...');
      
      if (!openAIApiKey) {
        console.error('OpenAI API key not found in environment variables for test');
        return new Response(JSON.stringify({ 
          status: 'error',
          message: 'OpenAI API key not configured' 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 // Explicitly return 200 to avoid Edge Function non-2xx error
        });
      }

      try {
        // Make a minimal API call to test the key
        const testResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: 'You are a test assistant.' },
              { role: 'user', content: 'Test' }
            ],
            max_tokens: 5,
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
            status: 200 // Important: Always return 200 to the client
          });
        }

        try {
          const data = JSON.parse(responseText);
          return new Response(JSON.stringify({ 
            status: 'success',
            message: 'OpenAI API key is valid and working!',
            response: data.choices[0].message.content
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
          });
        } catch (jsonError) {
          return new Response(JSON.stringify({ 
            status: 'error',
            message: `Could not parse OpenAI response: ${responseText}` 
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
          });
        }
      } catch (testError) {
        console.error('OpenAI API test failed:', testError);
        
        return new Response(JSON.stringify({ 
          status: 'error',
          message: `Error testing API key: ${testError.message}` 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 // Important: Always return 200 to the client
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
    if (!openAIApiKey) {
      console.error('OpenAI API key not found in environment variables');
      
      // Return a specific response for missing API key
      return new Response(JSON.stringify({ 
        status: 'error',
        message: 'OpenAI API key not configured',
        response: "I'm sorry, but I can't connect to my knowledge base right now. The system administrator needs to set up the OpenAI API key. In the meantime, please remember that consistent monitoring of blood glucose levels, staying hydrated, and maintaining a balanced diet are key aspects of diabetes management." 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 // Return 200 to avoid frontend errors
      });
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { 
              role: 'system', 
              content: 'You are Sypher, a health and wellness AI assistant. Provide helpful, concise advice about sleep, nutrition, exercise, and stress management. Your responses should be friendly, evidence-based, and focused on promoting overall wellbeing. Limit responses to 2-3 paragraphs at most.' 
            },
            { role: 'user', content: message }
          ],
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('OpenAI API error:', response.status, errorData);
        
        // Check if it's a rate limit error (429)
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
          message: `OpenAI API error: ${response.status} - ${errorData}`,
          response: "I apologize, but I'm having trouble connecting to my knowledge base right now. For diabetes management, it's important to monitor your blood glucose levels regularly, maintain a consistent meal schedule, stay physically active, and take medications as prescribed. If you have specific concerns, please consult your healthcare provider."
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        });
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      console.log('AI Response:', aiResponse);

      return new Response(JSON.stringify({ 
        status: 'success',
        response: aiResponse 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });
    } catch (openAIError) {
      console.error('OpenAI API call failed:', openAIError);
      
      // Provide a fallback response if OpenAI API call fails
      return new Response(JSON.stringify({ 
        status: 'error',
        message: `Error: ${openAIError.message}`,
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
      status: 200, // Always return 200 to avoid Edge Function errors
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
