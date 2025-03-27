
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Define form schema with validation rules
const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

type FormData = z.infer<typeof formSchema>;

interface EmailAuthFormProps {
  isSignUp: boolean;
  onSuccess?: () => void;
}

const EmailAuthForm: React.FC<EmailAuthFormProps> = ({ isSignUp, onSuccess }) => {
  const { signUpWithEmail, signInWithEmail } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with react-hook-form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Form submission handler
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      if (isSignUp) {
        const result = await signUpWithEmail(data.email, data.password);
        if (!result.error && result.data?.user) {
          if (onSuccess) onSuccess();
        }
      } else {
        const result = await signInWithEmail(data.email, data.password);
        if (!result.error && result.data?.user) {
          if (onSuccess) onSuccess();
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sypher-black">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="your@email.com"
                  {...field}
                  className="border-sypher-gray-light"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sypher-black">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="********"
                  {...field}
                  className="border-sypher-gray-light"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-sypher-blue hover:bg-sypher-blue-dark transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span>{isSignUp ? 'Sign Up' : 'Sign In'}</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EmailAuthForm;
