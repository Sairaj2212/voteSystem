import React, { useState, useEffect } from 'react';
import VerticalMenu from './VerticalMenu';
import './AdminCss/RequestDetails.css'; // Ensure this CSS file exists with your custom styles

const RequestDetails = () => {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [memberDetails, setMemberDetails] = useState([]);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [counts, setCounts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(10);

  const blocks = [
    { id: 1, title: 'Total Requests', count: counts.total || 0 },
    { id: 2, title: 'Phase 1 Accepted Members', count: counts.phase1 || 0 },
    { id: 3, title: 'Phase 2 Accepted Members', count: counts.phase2 || 0 },
    { id: 4, title: 'Rejected Members', count: counts.rejected || 0 }
  ];

  useEffect(() => {
    // Simulate fetching counts from a database or API
    const fetchedCounts = getMemberCounts();
    setCounts(fetchedCounts);
  }, []);

  useEffect(() => {
    // Update member details when selectedBlock changes
    if (selectedBlock) {
      const details = getMemberDetails(selectedBlock);
      setMemberDetails(details);
      setCurrentPage(1); // Reset current page on block selection
      setDetailsVisible(true);
    }
  }, [selectedBlock]);

  const getMemberCounts = () => {
    return {
      total: 10,
      phase1: 5,
      phase2: 3,
      rejected: 2
    };
  };

  const handleBlockClick = (blockId) => {
    setSelectedBlock(blockId);
  };

  const getMemberDetails = (blockId) => {
    const mockDetails = {
      1: [
        { id: '1', name: 'Jyothsana', voterId: 'V123', mobileNo: '1234567890', status: 'Completed', remarks: 'Good' },
        { id: '2', name: 'Lahitha', voterId: 'V124', mobileNo: '1234567891', status: 'Processing', remarks: 'In progress' },
        { id: '3', name: 'Suneel', voterId: 'V125', mobileNo: '1234567892', status: 'Completed', remarks: 'Good'},
        { id: '6', name: 'Sairaj', voterId: 'V128', mobileNo: '1234567895', status: 'Completed', remarks: 'Good' },
        { id: '7', name: 'Member Y', voterId: 'V129', mobileNo: '1234567896', status: 'Processing', remarks: 'In progress' },
        { id: '8', name: 'Member Z', voterId: 'V130', mobileNo: '1234567897', status: 'Rejected', remarks: 'Issue with documents' },
        { id: '6', name: 'Member X', voterId: 'V128', mobileNo: '1234567895', status: 'Completed', remarks: 'Good' },
        { id: '7', name: 'Member Y', voterId: 'V129', mobileNo: '1234567896', status: 'Processing', remarks: 'In progress' },
        { id: '8', name: 'Member Z', voterId: 'V130', mobileNo: '1234567897', status: 'Rejected', remarks: 'Issue with documents' },
        { id: '6', name: 'Member X', voterId: 'V128', mobileNo: '1234567895', status: 'Completed', remarks: 'Good' },
        { id: '7', name: 'Member Y', voterId: 'V129', mobileNo: '1234567896', status: 'Processing', remarks: 'In progress' },
        { id: '8', name: 'Member Z', voterId: 'V130', mobileNo: '1234567897', status: 'Rejected', remarks: 'Issue with documents' }
      ],
      2: [
        { id: '4', name: 'Member A', voterId: 'V126', mobileNo: '1234567893', status: 'Completed', remarks: 'Good' },
        { id: '5', name: 'Member B', voterId: 'V127', mobileNo: '1234567894', status: 'Processing', remarks: 'In progress' }
      ],
      3: [
        { id: '6', name: 'Member X', voterId: 'V128', mobileNo: '1234567895', status: 'Completed', remarks: 'Good' },
        { id: '7', name: 'Member Y', voterId: 'V129', mobileNo: '1234567896', status: 'Processing', remarks: 'In progress' },
        { id: '8', name: 'Member Z', voterId: 'V130', mobileNo: '1234567897', status: 'Rejected', remarks: 'Issue with documents' }
      ],
      4: [
        { id: '9', name: 'Member Rejected 1', voterId: 'V131', mobileNo: '1234567898', status: 'Rejected', remarks: 'Issue with documents' },
        { id: '10', name: 'Member Rejected 2', voterId: 'V132', mobileNo: '1234567899', status: 'Rejected', remarks: 'Issue with documents' }
      ]
    };
    return mockDetails[blockId] || [];
  };
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = memberDetails.slice(indexOfFirstMember, indexOfLastMember);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='sv'>
      <VerticalMenu />
      <div className="request-details-container">
        <div className="dashboard-container">
          <div className="dashboard">
            <div className="blocks">
              {blocks.map((block) => (
                <div
                  key={block.id}
                  className={`block ${selectedBlock === block.id ? 'active' : ''}`}
                  onClick={() => handleBlockClick(block.id)}
                >
                  <div className="block-title">{block.title}</div>
                  <div className="block-count">{block.count}</div>
                </div>
              ))}
            </div>
            <div className={`details ${detailsVisible ? 'fade-in' : ''}`}>
              {selectedBlock && (
                <div>
                  <h2>Details for {blocks.find((b) => b.id === selectedBlock).title}</h2>
                  <table className="details-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Voter ID</th>
                        <th>Mobile No</th>
                        <th>Status</th>
                        <th>Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentMembers.map((detail, index) => (
                        <tr key={index} className='tr'>
                          <td>{detail.id}</td>
                          <td>{detail.name}</td>
                          <td>{detail.voterId}</td>
                          <td>{detail.mobileNo}</td>
                          <td>{detail.status}</td>
                          <td>{detail.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Pagination controls */}
                  <div className="pagination">
                    {Array.from({ length: Math.ceil(memberDetails.length / membersPerPage) }, (_, index) => (
                      <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
