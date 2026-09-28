import express from "express";
import { supabase } from "./config/supabaseClient.js";

const app = express();
app.use(express.json())


app.get("/products", async (req, res) => {
    const {data, error} = await supabase.from("products").select();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  return res.json(data);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("id", id);

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!data) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.json(data);
});

app.post("/products", async (req, res) => {
  const {name, price} = req.body;

  if(!name || price == undefined) {
    return res.status(400).json({message: "name and price are required"})
  }
  
  const {data, error} = await supabase.from("products").insert({name, price}).select();

  if(error) {
    return res.status(500).json({message: error.message});
  }
  return res.json(data)
})

app.put("/products/:id", async (req, res) => {
    const {id} = req.params;
    const {name, price} = req.body;

    const {data, error} = await supabase.from("products").update({name, price}).eq("id", id).select();

    if (error) {
    return res.status(500).json({ message: error.message });
    }

    if (!data) {
    return res.status(404).json({ message: "Product not found" });
    }

    return res.json(data);
})

app.delete("/products/:id", async (req, res) => {
    const {id} = req.params;

    const {data, error} = await supabase.from("products").delete().eq("id", id).select();

    return res.json(data);
})

    
app.listen(3001, () => console.log("Server running on port: 3001"));
