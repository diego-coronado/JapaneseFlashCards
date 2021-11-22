import { useRouter } from "next/router";

function GoBackButton() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className="text-xs underline cursor-pointer"
    >
      Go back
    </div>
  );
}

export default GoBackButton;
