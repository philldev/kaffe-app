import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const SignupPage = () => {
  return (
    <div className="py-4 space-y-8">
      <h1 className="text-4xl text-center">Create Account</h1>
      <SignupForm />
      <div>
        <p className="text-muted-foreground">Already have an account?</p>
        <Link to="/login" className="underline">
          Login
        </Link>
      </div>
    </div>
  );
};

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signupResolver = zodResolver(signupSchema);

type SignupValues = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const form = useForm<SignupValues>({
    resolver: signupResolver,
  });

  const onSubmit = (data: SignupValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full">Sign up</Button>
      </form>
    </Form>
  );
};
