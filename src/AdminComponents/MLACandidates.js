import React, { useState, useEffect } from 'react';
import './AdminCss/MP.css';  
import VerticalMenu from './VerticalMenu';

const MLACandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', image: null, constituency: '', nominationDate: '', partySymbol: null });
  const [showDialog, setShowDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [blur, setBlur] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await fetch('https://51.21.62.160/mla/get_mla.php');
      if (!response.ok) throw new Error('Failed to fetch candidates');
      const data = await response.json();
      console.log('Fetched candidates:', data);
      setCandidates(data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const handleDelete = (id) => {
    setDeleteCandidateId(id);
    setShowDeleteDialog(true);
    setBlur(true);
    setShowAddDialog(false);
  };

  const handleAdd = () => {
    setForm({ id: '', name: '', image: null, constituency: '', nominationDate: '', partySymbol: null });
    setShowAddDialog(true);
    setBlur(true);
    setEdit(false);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch('https://51.21.62.160/mla/delete_mla.php', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteCandidateId })
      });
      if (!response.ok) throw new Error('Failed to delete candidate');
      const data = await response.json();
      if (!data.success) {
        setShowError(true);
        setErrorMessage(`⚠️ ${data.message}`);
        setTimeout(() => setShowError(false), 3000);
      } else {
        console.log('Deletion successful for ID:', deleteCandidateId);
        fetchCandidates();
        setShowDeleteDialog(false);
        setDeleteCandidateId(null);
        setBlur(false);
      }
    } catch (error) {
      console.error('Error deleting candidate:', error);
    }
  };

  const handleEdit = (id) => {
    setShowAddDialog(true);
    setEdit(true);
    setBlur(true);
    const candidateToEdit = candidates.find(candidate => candidate.id === id);
    if (candidateToEdit) {
      setForm({
        id: candidateToEdit.id,
        name: candidateToEdit.name,
        constituency: candidateToEdit.constituency,
        nominationDate: candidateToEdit.nomination_date,
        partySymbol: null,
        image: null,
      });
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'image' || e.target.name === 'partySymbol') {
      setForm({ ...form, [e.target.name]: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      handleUpdateCandidate(); // Directly call update method
    } else {
      confirmAddCandidate();
    }
  };

  const confirmAddCandidate = async () => {
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('constituency', form.constituency);
      formData.append('nominationDate', form.nominationDate);
      formData.append('partySymbol', form.partySymbol);
      formData.append('image', form.image);

      const response = await fetch('https://51.21.62.160/mla/add_mla.php', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to submit candidate');

      const data = await response.json();
      if (!data.success) {
        setShowError(true);
        setErrorMessage(`⚠️ ${data.message}`);
        setTimeout(() => setShowError(false), 3000);
      } else {
        fetchCandidates();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        setForm({ id: '', name: '', image: '', constituency: '', nominationDate: '', partySymbol: '' });
        setShowDialog(false);
        setShowAddDialog(false);
        setBlur(false);
      }
    } catch (error) {
      console.error('Error handling submit:', error);
      setShowError(true);
      setErrorMessage('⚠️ Missing required fields');
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleUpdateCandidate = async () => {
    try {
      const formData = new FormData();
      formData.append('id', form.id);
      formData.append('name', form.name);
      formData.append('constituency', form.constituency);
      formData.append('nominationDate', form.nominationDate);
      formData.append('partySymbol', form.partySymbol);
      formData.append('image', form.image);

      const response = await fetch('https://51.21.62.160/mla/update_mla.php', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to update candidate');

      const data = await response.json();
      if (!data.success) {
        setShowError(true);
        setErrorMessage(`⚠️ ${data.message}`);
        setTimeout(() => setShowError(false), 3000);
      } else {
        fetchCandidates();
        setShowAddDialog(false);
        setBlur(false);
      }
    } catch (error) {
      console.error('Error updating candidate:', error);
      setShowError(true);
      setErrorMessage('An unexpected error occurred. Please try again.');
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleCancelDelete = () => {
    setDeleteCandidateId(null);
    setShowDeleteDialog(false);
    setShowAddDialog(false);
    setEdit(false);
    setBlur(false);
  };

  return (
    <>
      <div className={blur ? 'blurred' : ''}>
        <VerticalMenu />
      </div>

      <div className={blur ? 'blurred' : ''}>
        <center>
          <h2 className='h2header'>MLA Candidates Management</h2><h5>Total Members: {candidates.length}</h5><hr></hr>
        <table className="candidates-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Constituency</th>
              <th>Nomination Date</th>
              <th>Party Symbol</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.id}</td>
                <td><img src={`data:image/jpeg;base64,${candidate.image}`} alt={candidate.name} width="50" /></td>
                <td>{candidate.name}</td>
                <td>{candidate.constituency}</td>
                <td>{candidate.nomination_date}</td>
                <td><img src={`data:image/jpeg;base64,${candidate.party_symbol}`} alt="Party Symbol" width="50" /></td>
                <td>
                  <button className="save" onClick={() => handleEdit(candidate.id)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </center>
        <div className="sai">
          <button type="button" className="edit3" onClick={handleAdd}>+</button>
        </div>
      </div>
      

      {showAddDialog && (
        <div className="dialog">
          <div className="closeWindow flex-container1">
           <h6 className='h6d'>{edit ? 'Edit MLA Candidate' : 'Add MLA Candidate'}</h6>
            <button style={{backgroundColor:'rgb(8, 41, 39)' , marginRight:'10px'}} onClick={handleCancelDelete}>❌</button>
          </div>
          <form onSubmit={handleSubmit} className="candidate-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="constituency">Constituency:</label>
              <input type="text" id="constituency" name="constituency" value={form.constituency} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="nominationDate">Nomination Date:</label>
              <input type="date" id="nominationDate" name="nominationDate" value={form.nominationDate} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="partySymbol">Party Symbol:</label>
              <input type="file" id="partySymbol" name="partySymbol" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image:</label>
              <input type="file" id="image" name="image" onChange={handleChange} />
            </div>
            {!edit ? (
              <button className="edi" type="submit">Add</button>
            ) : (
              <div className="edit-actions">
                <button className="save" type="submit">Save</button>
                <button className="delete" type="button" onClick={() => handleDelete(form.id)}>Delete</button>
              </div>
            )}
          </form>
        </div>
      )}

      {deleteCandidateId && showDeleteDialog && (
        <div className="dialog1">
          <h3>Confirm Delete</h3>
          <p>Are you sure you want to delete this candidate?</p>
          <button className="save" onClick={confirmDelete}>Confirm</button>
          <button className="delete" onClick={handleCancelDelete}>Cancel</button>
        </div>
      )}

      {showDialog && (
        <div className="dialog">
          <h3>Confirm Add Candidate</h3>
          <p>Name: {form.name}</p>
          <p>Constituency: {form.constituency}</p>
          <p>Nomination Date: {form.nominationDate}</p>
          <button className="save" onClick={confirmAddCandidate}>Confirm</button>
          <button className="delete" onClick={() => setShowDialog(false)}>Cancel</button>
        </div>
      )}

      {showSuccess && <div className="success-popup">Candidate added successfully</div>}
      {showError && <div className="error-popup">{errorMessage}</div>}
    </>
  );
};

export default MLACandidates;
