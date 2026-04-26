import { useEffect, useState } from "react";
import {
  getHistory,
  deleteHistory,
  updateHistory,
} from "../services/api";

import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Button,
  Stack,
  TextField,
  Pagination,
} from "@mui/material";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔍 Search
  const [search, setSearch] = useState("");

  // ✏️ Edit
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editSummary, setEditSummary] = useState("");

  // 📄 Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await getHistory();
      setHistory(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // 🔥 DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    await deleteHistory(id);
    setHistory((prev) => prev.filter((item) => item._id !== id));
  };

  // ✏️ EDIT
  const handleEdit = (item) => {
    setEditId(item._id);
    setEditText(item.text);
    setEditSummary(item.summary);
  };

  const handleUpdate = async (id) => {
    const res = await updateHistory(id, {
      text: editText,
      summary: editSummary,
    });

    setHistory((prev) =>
      prev.map((item) =>
        item._id === id ? res.data.data : item
      )
    );

    setEditId(null);
  };

  // 🔍 FILTER
  const filtered = history.filter((item) =>
    item.text.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 PAGINATION
  const start = (page - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        📜 History
      </Typography>

      {/* 🔍 Search */}
      <TextField
        fullWidth
        label="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      {loading ? (
        <CircularProgress />
      ) : paginated.length === 0 ? (
        <Typography>No history found 🚀</Typography>
      ) : (
        <Stack spacing={2}>
          {paginated.map((item) => (
            <Card key={item._id}>
              <CardContent>
                {editId === item._id ? (
                  <>
                    <TextField
                      fullWidth
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />

                    <TextField
                      fullWidth
                      value={editSummary}
                      onChange={(e) => setEditSummary(e.target.value)}
                      sx={{ mt: 1 }}
                    />

                    <Button onClick={() => handleUpdate(item._id)}>
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="subtitle2" color="gray">
                      Original Text:
                    </Typography>
                    <Typography>{item.text}</Typography>

                    <Typography
                      variant="subtitle2"
                      color="gray"
                      sx={{ mt: 2 }}
                    >
                      Summary:
                    </Typography>
                    <Typography>{item.summary}</Typography>

                    <Stack direction="row" spacing={2} mt={2}>
                      <Button
                        variant="outlined"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      {/* 📄 Pagination */}
      <Pagination
        count={Math.ceil(filtered.length / itemsPerPage)}
        page={page}
        onChange={(e, val) => setPage(val)}
        sx={{ mt: 3, display: "flex", justifyContent: "center" }}
      />
    </Container>
  );
}

export default History;