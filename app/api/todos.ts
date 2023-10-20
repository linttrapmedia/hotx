type TodoFormData = FormData & {
  todo: string;
};

export default async function handler(req: Request) {
  const formData = (await req.formData()) as TodoFormData;
  return new Response(JSON.stringify({ message: formData }));
}
