const UserDropdown = ({ users, setOwner= ()=>{}, selectedUserId= ()=>{}, setSelectedUserId= () =>{} }) => {
  const handleChange = (event) => {
    const userId = event.target.value;
    setSelectedUserId(userId);
    const selectedUser = users.find(user => user.ID === parseInt(userId, 10));

    if (selectedUser) {
      setOwner({
        ID: selectedUser.ID,
        Name: selectedUser.Name,
        Institution: selectedUser.Institution
      });
    } else {
      setOwner({});
    }
  };

  return (
    <select value={selectedUserId} onChange={handleChange}>
      <option value="" disabled>Seleccione un usuario</option>
      {users.map(user => (
        <option key={user.ID} value={user.ID}>
          {user.Name}
        </option>
      ))}
    </select>
  );
};

export default UserDropdown;
