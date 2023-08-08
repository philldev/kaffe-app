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

export const LoginPage = () => {
  return (
    <div className="py-4 space-y-8">
      <h1 className="text-4xl text-center">Login</h1>
      <LoginForm />
      <div>
        <p className="text-muted-foreground">Don't have an account?</p>
        <Link to="/create-account" className="underline">
          Create account
        </Link>
      </div>
    </div>
  );
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const loginResolver = zodResolver(loginSchema);

type LoginValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const form = useForm<LoginValues>({
    resolver: loginResolver,
  });

  const onSubmit = (data: LoginValues) => {
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
        <Button className="w-full">Login</Button>
      </form>
    </Form>
  );
};
