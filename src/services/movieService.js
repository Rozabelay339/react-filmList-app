const API_URL = "https://tokenservice-rough-frost-9409.fly.dev/movies";

export const getMovies = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
};

export const createMovie = async (movie) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  if (!res.ok) throw new Error("Failed to create movie");
};

export const updateMovie = async (movie) => {
  const res = await fetch(`${API_URL}/${movie.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  if (!res.ok) throw new Error("Failed to update movie");
};

export const deleteMovie = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete movie");
};
