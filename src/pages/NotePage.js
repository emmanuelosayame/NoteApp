import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, IconButton, Textarea, Flex } from "@chakra-ui/react";
import { CheckIcon, ChevronLeftIcon, DeleteIcon } from "@chakra-ui/icons";
import { useSWRConfig } from "swr";

function NotePage({ notes }) {
  let noteId = useParams().id;

  const history = useNavigate();

  const [note, setNote] = useState(null);
  // eslint-disable-next-line
  useEffect(() => {
    if (noteId === "new") return;
    let notedata = notes?.find((x) => x.id === parseInt(noteId)).body;
    setNote(notedata);
  }, [noteId, notes]);

  const { mutate } = useSWRConfig();

  const updateNote = async () => {
    const staleNotes = notes.filter((note) => note.id !== parseInt(noteId));
    mutate(
      "notes",
      async () => {
        await fetch(`https://fake-server-levi.herokuapp.com/notes/${noteId}/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ body: note, updated: new Date() }),
        });
        return [{ body: note, updated: new Date(), id: noteId }, ...staleNotes];
      },
      {
        optimisticData: [
          { body: note, updated: new Date(), id: noteId },
          ...staleNotes,
        ],
      }
    );
    history("/");
  };

  const createNote = async () => {
    if (note !== null) {
      // const staleNotes = notes.filter((note) => note.id !== parseInt(noteId));
      mutate(
        "notes",
        async () => {
          await fetch(`https://fake-server-levi.herokuapp.com/notes/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ body: note, updated: new Date() }),
          });
          return [{ body: note, updated: new Date() }, ...notes];
        },
        {
          optimisticData: [{ body: note, updated: new Date() }, ...notes],
          revalidate: false,
        }
      );
      history("/");
    } else {
      history("/");
    }
  };

  const deleteNote = async () => {
    history("/");
    await fetch(`https://fake-server-levi.herokuapp.com/notes/${noteId}/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  };

  let submitButton = () => {
    if (noteId !== "new" && !note) {
      deleteNote();
    } else if (noteId !== "new") {
      updateNote();
    } else if (noteId === "new" && note !== null) {
      createNote();
    } else {
      history("/");
    }
  };

  return (
    <Box w="100%">
      <Flex justifyContent="space-between">
        <Button
          ml="1"
          color="blue.400"
          iconSpacing="-2"
          variant="link"
          fontWeight="400"
          size="lg"
          leftIcon={<ChevronLeftIcon h="10" w="10" />}
          onClick={submitButton}
        >
          {" "}
        </Button>

        {noteId === "new" ? (
          <IconButton
            icon={<CheckIcon />}
            m="3"
            colorScheme="red"
            onClick={createNote}
          />
        ) : (
          <IconButton
            icon={<DeleteIcon />}
            m="3"
            onClick={deleteNote}
            colorScheme="red"
          />
        )}
      </Flex>

      <Textarea
        h="590px"
        w="100%"
        m="1"
        bgColor="transparent"
        fontSize="20px"
        variant="foutline"
        resize="none"
        value={note}
        className="scroll-hidden"
        onChange={(evnt) => {
          setNote(evnt.target.value);
        }}
      />
    </Box>
  );
}

export default NotePage;
