"use client";
import { useRouter } from "next/navigation";
import {
  signIn as signInServer,
  signUp as signUpServer,
} from "@/lib/supabase/auth-actions";
import { useState } from "react";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
} from "@nextui-org/react";

export default function SignInForm() {
  const [selected, setSelected] = useState("login");
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const data = new FormData();

  const signIn = async (formData: FormData) => {
    setErrorMsg("");
    formData.append("email", email);
    formData.append("password", password);
    const { error } = await signInServer(formData);
    error ? setErrorMsg(error.message) : router.push("/");
  };

  const signUp = async (formData: FormData) => {
    setErrorMsg("");
    formData.append("email", email);
    formData.append("password", password);
    formData.append("extraData", JSON.stringify({ username: username }));
    const { error } = await signUpServer(formData);
    error ? setErrorMsg(error.message) : router.push("/");
  };

  return (
    <div className="flex flex-col w-full">
      <Card className="max-w-full w-[440px] h-[500px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={(val) => setSelected(val as string)}
          >
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-4">
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onValueChange={setEmail}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onValueChange={setPassword}
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Sign up
                  </Link>
                </p>
                <div className="flex flex-col">
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => signIn(new FormData())}
                  >
                    Login
                  </Button>
                  {errorMsg && (
                    <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                      {errorMsg}
                    </p>
                  )}
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form className="flex flex-col gap-4 h-[300px]">
                <Input
                  isRequired
                  label="Username"
                  name="username"
                  placeholder="Enter your username"
                  value={username}
                  onValueChange={setUsername}
                />
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onValueChange={setEmail}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onValueChange={setPassword}
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end flex-col">
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => signUp(new FormData())}
                  >
                    Sign up
                  </Button>
                  {errorMsg && (
                    <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                      {errorMsg}
                    </p>
                  )}
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
