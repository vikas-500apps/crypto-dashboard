import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCryptoData } from "../features/cryptoSlice";
import {
  updateComponentOrder,
  removeComponent,
  toggleTheme,
  setLayout,
  setFilter,
} from "../features/layoutSlice";
import Table from "./Table";
import Graph from "./Graph";
import SummaryCard from "./SummaryCard";
import AddComponentButton from "./AddComponentButton";
import { FaCloudMoon, FaRegMoon, FaFileImport, FaFileExport, FaTrash } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { components = [], theme, filter } = useSelector((state) => state.layout);
  const cryptoData = useSelector((state) => state.crypto.data);

  useEffect(() => {
    dispatch(fetchCryptoData());
    const interval = setInterval(() => {
      dispatch(fetchCryptoData());
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    const savedLayout = localStorage.getItem("dashboardLayout");
    if (savedLayout) {
      dispatch(setLayout(JSON.parse(savedLayout)));
    }
  }, [dispatch]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(components);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(updateComponentOrder(items));
    saveLayout(items);
  };

  const handleRemoveComponent = (id) => {
    const updatedComponents = components.filter((comp) => comp.id !== id);
    dispatch(removeComponent(id));
    saveLayout(updatedComponents);
  };

  const saveLayout = (updatedComponents) => {
    const layoutToSave = { components: updatedComponents, theme, filter };
    localStorage.setItem("dashboardLayout", JSON.stringify(layoutToSave));
  };

  const handleExportConfig = () => {
    const config = JSON.stringify({ components, theme, filter });
    const blob = new Blob([config], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "dashboard-config.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportConfig = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const config = JSON.parse(e.target.result);
      dispatch(setLayout(config));
      saveLayout(config.components);
    };
    reader.readAsText(file);
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const filteredData =
    filter === "all" ? cryptoData : cryptoData.slice(0, parseInt(filter, 10));

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-2 sm:mb-0">Crypto Dashboard</h1>
          <div className="flex items-center gap-4">
            <AddComponentButton theme={theme} />
            <select
              value={filter}
              onChange={handleFilterChange}
              className={`px-3 py-2 rounded ${
                theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"
              }`}
            >
              <option value="all">All Coins</option>
              <option value="10">Top 10</option>
              <option value="20">Top 20</option>
              <option value="50">Top 50</option>
            </select>
            <div
              onClick={() => dispatch(toggleTheme())}
              className={`cursor-pointer w-10 h-10 rounded-full flex items-center justify-center ${
                theme === "dark"
                  ? "bg-gray-700 hover:bg-gray-700 text-white"
                  : "bg-gray-200 hover:bg-gray-200 text-black"
              }`}
            >
              {theme === "dark" ? <FaCloudMoon size={20} /> : <FaRegMoon size={20} />}
            </div>
            <div>
              <div
                onClick={handleExportConfig}
                className="cursor-pointer w-10 h-10 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-md"
              >
                <FaFileExport size={20} />
              </div>
            </div>
            <div>
              <input
                type="file"
                onChange={handleImportConfig}
                accept=".json"
                className="hidden"
                id="import-config"
              />
              <label
                htmlFor="import-config"
                className="cursor-pointer w-10 h-10 flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 text-white rounded-md"
              >
                <FaFileImport size={20} />
              </label>
            </div>
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="dashboard">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {components && components.length > 0 ? (
                  components.map((component, index) => {
                    if (component.type === "summary") {
                      return (
                        <div
                          key={component.id}
                          className={`p-4 rounded shadow ${
                            theme === "dark" ? "bg-gray-800" : "bg-white"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-semibold">
                            Market Summary
                            </h2>
                            <button
                              onClick={() => handleRemoveComponent(component.id)}
                              className={`px-3 mt-2 py-2 rounded ${
                                theme === "dark"
                                  ? "bg-gray-700 text-red-700"
                                  : "bg-gray-100 text-red-700"
                              }`}
                            >
                              <FaTrash size={20} />
                            </button>
                          </div>
                          <SummaryCard data={filteredData} theme={theme} />
                        </div>
                      );
                    }

                    return (
                      <Draggable
                        key={component.id}
                        draggableId={component.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-4 rounded shadow ${
                              theme === "dark" ? "bg-gray-800" : "bg-white"
                            }`}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <h2 className="text-xl font-semibold">
                                {component.type.charAt(0).toUpperCase() +
                                  component.type.slice(1)}
                              </h2>
                              <button
                                onClick={() => handleRemoveComponent(component.id)}
                                className={`px-3 mt-2 py-2 rounded ${
                                  theme === "dark"
                                    ? "bg-gray-700 text-red-700"
                                    : "bg-gray-100 text-red-700"
                                }`}
                              >
                                <FaTrash size={20} />
                              </button>
                            </div>
                            {component.type === "table" && (
                              <Table data={filteredData} theme={theme} />
                            )}
                            {component.type === "graph" && (
                              <Graph data={filteredData} theme={theme} />
                            )}
                          </div>
                        )}
                      </Draggable>
                    );
                  })
                ) : (
                  <div className="p-4 text-center">Add components to your dashboard!</div>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Dashboard;
