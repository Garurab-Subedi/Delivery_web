import { useContext } from "react";
import { FoodContext } from "../../context/FoodContext";

const BASE_URL = "http://localhost/fooddelivery";

export default function FoodMenu() {
  const { randomFoods, loading } = useContext(FoodContext);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🍽 Featured Foods</h1>

      {(!randomFoods || randomFoods.length === 0) && (
        <p style={styles.empty}>No foods available</p>
      )}

      <div style={styles.grid}>
        {randomFoods?.map((food) => (
          <div key={food.id} style={styles.card}>
            <img
              src={BASE_URL + food.image}
              alt={food.name}
              style={styles.image}
            />

            <div style={styles.content}>
              <h3 style={styles.name}>{food.name}</h3>
              <p style={styles.desc}>{food.description}</p>

              <div style={styles.bottom}>
                <span style={styles.price}>Rs {food.price}</span>
                <button style={styles.btn}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------- INLINE UI STYLES (Clean + Modern) ------- */
const styles = {
  container: {
    maxWidth: "1050px",
    margin: "50px auto",
    padding: "10px",
  },
  title: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "25px",
  },
  empty: {
    textAlign: "center",
    color: "#888",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    overflow: "hidden",
    transition: "0.3s",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  content: {
    padding: "15px",
  },
  name: {
    margin: 0,
  },
  desc: {
    fontSize: "14px",
    color: "#555",
    marginTop: "6px",
    height: "40px",
    overflow: "hidden",
  },
  bottom: {
    marginTop: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontWeight: "bold",
    fontSize: "18px",
    color: "red",
  },
  btn: {
    padding: "8px 12px",
    background: "red",
    color: "#fff",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
};
