import React, { useState } from 'react';

// Initial sample data for the TV schedule
const initialSchedule = [
  { id: 1, title: 'Morning News', time: '09:00 AM', description: 'Catch up on the latest news and weather updates.' },
  { id: 2, title: 'Cooking Show', time: '10:00 AM', description: 'Join us for delicious recipes and cooking tips.' },
  { id: 3, title: 'Talk Show', time: '11:00 AM', description: 'Engaging discussions with celebrities and experts.' },
];

const Schedule = () => {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [selectedShow, setSelectedShow] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newShow, setNewShow] = useState({ title: '', time: '', description: '' });

  const handleShowClick = (show) => {
    setSelectedShow(show);
  };

  const closeDetails = () => {
    setSelectedShow(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShow({ ...newShow, [name]: value });
  };

  const handleAddShow = () => {
    const newId = schedule.length ? schedule[schedule.length - 1].id + 1 : 1;
    setSchedule([...schedule, { ...newShow, id: newId }]);
    setNewShow({ title: '', time: '', description: '' }); // Reset form
  };

  const handleEditShow = () => {
    const updatedSchedule = schedule.map((show) =>
      show.id === selectedShow.id ? { ...selectedShow, ...newShow } : show
    );
    setSchedule(updatedSchedule);
    setIsEditing(false);
    setSelectedShow(null);
  };

  const handleDeleteShow = (id) => {
    setSchedule(schedule.filter(show => show.id !== id));
    closeDetails();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">TV Schedule</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {schedule.map((show) => (
          <div
            key={show.id}
            className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleShowClick(show)}
          >
            <h2 className="text-xl font-semibold">{show.title}</h2>
            <p className="text-gray-400">{show.time}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Add New Show</h2>
        <input
          type="text"
          name="title"
          value={newShow.title}
          placeholder="Show Title"
          onChange={handleInputChange}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          name="time"
          value={newShow.time}
          placeholder="Air Time"
          onChange={handleInputChange}
          className="border p-2 w-full mb-2"
        />
        <textarea
          name="description"
          value={newShow.description}
          placeholder="Description"
          onChange={handleInputChange}
          className="border p-2 w-full mb-2"
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleAddShow}
        >
          Add Show
        </button>
      </div>

      {selectedShow && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-gray-900 p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-2">{selectedShow.title}</h2>
            <p className="text-gray-400">{selectedShow.time}</p>
            <p className="mt-4">{selectedShow.description}</p>
            <button
              className="mt-2 bg-yellow-500 text-white py-2 px-4 rounded"
              onClick={() => {
                setNewShow(selectedShow);
                setIsEditing(true);
              }}
            >
              Edit
            </button>
            <button
              className="mt-2 bg-red-500 text-white py-2 px-4 rounded"
              onClick={() => handleDeleteShow(selectedShow.id)}
            >
              Delete
            </button>
            <button
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
              onClick={closeDetails}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-gray-900 p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-2">Edit Show</h2>
            <input
              type="text"
              name="title"
              value={newShow.title}
              placeholder="Show Title"
              onChange={handleInputChange}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              name="time"
              value={newShow.time}
              placeholder="Air Time"
              onChange={handleInputChange}
              className="border p-2 w-full mb-2"
            />
            <textarea
              name="description"
              value={newShow.description}
              placeholder="Description"
              onChange={handleInputChange}
              className="border p-2 w-full mb-2"
            />
            <button
              className="bg-yellow-500 text-white py-2 px-4 rounded"
              onClick={handleEditShow}
            >
              Save Changes
            </button>
            <button
              className="mt-2 bg-red-500 text-white py-2 px-4 rounded"
              onClick={() => {
                setIsEditing(false);
                setNewShow({ title: '', time: '', description: '' });
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
