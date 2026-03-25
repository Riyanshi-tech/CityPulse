import { useAuth } from "../../context/AuthContext";
 export default function Home() {
  const { user } = useAuth();
  return (
    <div style={{ color: "white", padding: "20px" }}>
      Home Page Working 🚀
    </div>
  );
}