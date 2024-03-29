import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskColumn from "../components/tasks-components/TaskColumn";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import SortIcon from "@mui/icons-material/Sort";
import "../styles/Tasks.css";
import { Box, TextField, MenuItem, FormControl, Select } from "@mui/material";
import AxiosInstance from "../components/Axios";
import { useParams } from "react-router-dom";
export default function TasksPage() {
  const [completed, setCompleted] = useState([]);
  const [inprogress, setInProgress] = useState([]);
  const [todo, setToDo] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortByFilter, setSortByFilter] = useState("highToLow");

  const MyParam = useParams();
  const MyId = MyParam.id;

  const fetchTasksData = async () => {
    try {
      const response = await AxiosInstance.get(`tasks/?event_id=${MyId}`);
      setToDo(response.data.filter((p) => p.status === "To Do"));
      setCompleted(response.data.filter((p) => p.status === "Done"));
      setInProgress(response.data.filter((p) => p.status === "In Progress"));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasksData();
  }, []);

  const getPriorityLabel = (priority) => {
    switch (true) {
      case priority >= 1 && priority <= 3:
        return "Low";
      case priority >= 4 && priority <= 7:
        return "Medium";
      case priority >= 8 && priority <= 10:
        return "High";
      default:
        return "Unknown";
    }
  };

  const filterTasks = (tasks) => {
    let filteredTasks = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.priority &&
          getPriorityLabel(task.priority)
            .toLowerCase()
            .includes(searchQuery.toLowerCase()))
    );

    filteredTasks.sort((a, b) => {
      const priorityA = a.priority || 0;
      const priorityB = b.priority || 0;

      const deadlineDateA = new Date(a.deadline_date);
      const deadlineDateB = new Date(b.deadline_date);

      if (sortByFilter === "lowToHigh") {
        return priorityA - priorityB;
      } else if (sortByFilter === "highToLow") {
        return priorityB - priorityA;
      } else if (sortByFilter === "nearestDeadline") {
        const today = new Date();
        const deadlineDiffA = Math.abs(deadlineDateA - today);
        const deadlineDiffB = Math.abs(deadlineDateB - today);

        return deadlineDiffA - deadlineDiffB;
      } else {
        return 0;
      }
    });

    return filteredTasks;
  };

  const handleSortByFilter = (event) => {
    setSortByFilter(event.target.value);
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const columnTasks =
        source.droppableId === "1"
          ? todo
          : source.droppableId === "2"
          ? completed
          : inprogress;
      const reorderedTasks = Array.from(columnTasks);
      const [reorderedItem] = reorderedTasks.splice(source.index, 1);
      reorderedTasks.splice(destination.index, 0, reorderedItem);

      switch (source.droppableId) {
        case "1": // TO DO
          setToDo(reorderedTasks);
          break;
        case "2": // DONE
          setCompleted(reorderedTasks);
          break;
        case "3": // IN PROGRESS
          setInProgress(reorderedTasks);
          break;
        default:
          break;
      }
      return;
    }

    deletePreviousState(source.droppableId, draggableId);

    const task = findItemById(draggableId, [
      ...todo,
      ...completed,
      ...inprogress,
    ]);

    if (destination.droppableId === "2") {
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];
      task.completion_date = formattedDate;
    } else {
      task.completion_date = null;
    }

    switch (destination.droppableId) {
      case "1":
        task.status = "To Do";
        setToDo((prevToDo) => {
          const newToDo = Array.from(prevToDo);
          newToDo.splice(destination.index, 0, task);
          return newToDo;
        });
        await AxiosInstance.patch(`tasks/${draggableId}/`, { status: "To Do" });
        break;
      case "2":
        task.status = "Done";
        setCompleted((prevCompleted) => {
          const newCompleted = Array.from(prevCompleted);
          newCompleted.splice(destination.index, 0, task);
          return newCompleted;
        });
        await AxiosInstance.patch(`tasks/${draggableId}/`, { status: "Done" });
        break;
      case "3":
        task.status = "In Progress";
        setInProgress((prevBacklog) => {
          const newBacklog = Array.from(prevBacklog);
          newBacklog.splice(destination.index, 0, task);
          return newBacklog;
        });
        await AxiosInstance.patch(`tasks/${draggableId}/`, {
          status: "In Progress",
        });
        break;
      default:
        break;
    }
  };

  function deletePreviousState(sourceDroppableId, taskId) {
    switch (sourceDroppableId) {
      case "1":
        setToDo(removeItemById(taskId, todo));
        break;
      case "2":
        setCompleted(removeItemById(taskId, completed));
        break;
      case "3":
        setInProgress(removeItemById(taskId, inprogress));
        break;
    }
  }

  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id != id);
  }

  return (
    <Box className="task-board-container">
      <DragDropContext onDragEnd={handleDragEnd}>
        <h2 style={{ textAlign: "center", fontSize: "30px" }}>Task Board!</h2>

        <TextField
          className="search-bar"
          placeholder="Search Tasks"
          InputLabelProps={{ shrink: true, required: false }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormControl className="sort-by-dropdown" variant="outlined">
          <Select
            value={sortByFilter || ""}
            onChange={handleSortByFilter}
            displayEmpty
            inputProps={{ "aria-label": "Sort By Priority" }}
            // IconComponent={() => <SortIcon />}
          >
            <MenuItem value="highToLow">High to Low Priority</MenuItem>
            <MenuItem value="lowToHigh">Low to High Priority</MenuItem>
            <MenuItem value="nearestDeadline">Nearest Deadline</MenuItem>
          </Select>
        </FormControl>

        <div className="task-board">
          <TaskColumn
            title={"To Do"}
            tasks={filterTasks(todo)}
            columnId={"1"}
            refreshTasks={fetchTasksData}
          />
          <TaskColumn
            title={"In Progress"}
            tasks={filterTasks(inprogress)}
            columnId={"3"}
            refreshTasks={fetchTasksData}
          />
          <TaskColumn
            title={"Done"}
            tasks={filterTasks(completed)}
            columnId={"2"}
            refreshTasks={fetchTasksData}
          />
        </div>
      </DragDropContext>
    </Box>
  );
}
