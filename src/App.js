import { Box, Flex, useColorMode } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useSWR from "swr";
import "./App.css";
import Header from "./components/Header";
import NoteList from "./pages/NoteList";
import NotePage from "./pages/NotePage";

function App() {
  const { colorMode } = useColorMode();
  const fetcher = () =>
    fetch("https://fake-server-levi.herokuapp.com/notes/").then((res) =>
      res.json()
    );
  const { data: notes, error } = useSWR("notes", fetcher );

  return (
    <Router>
      <Flex justify="center" height="743">
        <Box
          w="590px"
          h="700px"
          borderX="2px"
          borderBottom="2px"
          borderColor={colorMode === "light" ? "blue.50" : "gray.600"}
          borderBottomRadius="15"
        >
          <Header />
          <Flex w="100%" mt="8px">
            <Routes>
              <Route
                index
                path="/"
                element={<NoteList notes={notes} error={error} />}
              />
              <Route
                path="/note/:id"
                element={<NotePage notes={notes} animate={true} />}
              />
            </Routes>
          </Flex>
        </Box>
      </Flex>
    </Router>
  );
}

export default App;
