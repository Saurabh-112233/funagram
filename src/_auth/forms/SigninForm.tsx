import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signinValidation} from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { Link,useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import {  useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
 

const SigninForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast()
  // const isLoading = false;
  const {checkAuthUser,isLoading:isUserLoading} = useUserContext();
 
  const {mutateAsync:signInAccount} = useSignInAccount()

   // 1. Define your form.
   const form = useForm<z.infer<typeof signinValidation>>({
    resolver: zodResolver(signinValidation),
    defaultValues: {
      email:'',
      password:''
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signinValidation>) {
      
      const session = await signInAccount({
        email:values.email,
        password:values.password
      })

      if(!session){
        toast({ title: "Login failed. Please try again." });
        return;
      }

      const isLoggedIn = await checkAuthUser();

      if(isLoggedIn){
        form.reset();
        navigate("/")
      }
      else{
        return toast({title:"Signup failed. Please try again later"})
      }
  }
  return (
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
          <img src="/assets/images/logo.svg"/>

          <h2 className="h3-bolld md:h2-bold pt-5 sm:pt-12">Login to your account</h2>

          <p className="text-light-3 small-medium md:base-regular mt-2">To use Funagram,please enter your details</p>
          


          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" className="shad-input" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="shad-button_primary">
              {isUserLoading ? (
                <div className="flex-center gap-2">
                  <Loader /> Loading...
                </div>
              ):"Sign in"}
            </Button>
            <p className="text-small text-light-2 text-center
              mt-2">
                Don't have an account?
                <Link to='/sign-up' className="text-primary-600
                  text-small-semibold ml-1">
                  Sign up
                </Link>
            </p>
          </form>
        </div>  
      </Form>
  )
}

export default SigninForm

