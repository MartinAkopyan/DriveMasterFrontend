<script setup>
import { ref } from "vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { useToast } from "primevue/usetoast";
import { z } from "zod";
import { provideApolloClient, useMutation } from '@vue/apollo-composable';

definePageMeta({
  layout: "login",
});

const initialValues = ref({
  password: "",
  email: "",
});

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
				email
        role
      }
    }
  }
`;


const apollo = useApollo();
const authClient = apollo.clients.auth;
provideApolloClient(authClient);
const { mutate } = useMutation(LOGIN_MUTATION);

const toast = useToast();

const resolver = ref(
  zodResolver(
    z.object({
      password: z.string().min(1, { message: "Password is required." }),
      email: z
        .string()
        .min(1, { message: "Email is required." })
        .email({ message: "Invalid email address." }),
    })
  )
);


const onFormSubmit = async ({ valid, values }) => {
  if (valid) {
    try {
      const { data } = await mutate({
        email: values.email,
        password: values.password,
      });

      const token = data?.login?.token;
			const user = data?.login?.user;
      if (!token) throw new Error("Token is missing");
      const cookie = useCookie("auth._token.auth", {
				maxAge: 86400
			});
      cookie.value = `Bearer ${token}`;

      toast.add({
        severity: "success",
        summary: "Success",
        life: 3000,
      });
			console.log(user);

    } catch (err) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: err.message,
        life: 4000,
      });

      console.log(err.message);
    }
  }
};
</script>
<template>
  <div class="container">
    <div
      class="card flex mx-auto my-auto justify-center max-w-[300px] bg-slate-100 w-full p-8"
    >
      <Form
        v-slot="$form"
        :resolver="resolver"
        :initialValues="initialValues"
        @submit="onFormSubmit"
        class="flex flex-col gap-4 w-full sm:w-56"
      >
        <h2 class="text-center font-semibold">Login</h2>
        <div class="flex flex-col gap-1">
          <InputText name="email" type="text" placeholder="Email" fluid />
          <Message
            v-if="$form.email?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.email.error?.message }}</Message
          >
        </div>
        <div class="flex flex-col gap-1">
          <InputText
            name="password"
            type="password"
            placeholder="Passsword"
            fluid
          />
          <Message
            v-if="$form.password?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.password.error?.message }}</Message
          >
        </div>
        <Button type="submit" severity="primary" label="Submit" />
      </Form>
    </div>
  </div>
</template>

<style lang="scss"></style>
