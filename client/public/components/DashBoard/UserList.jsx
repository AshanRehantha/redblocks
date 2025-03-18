import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userDeleteEmployeeRequest, userGetEmployeeListRequest } from '../../redux/actions';
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Icon,
  Table,
  Button,
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Header,
  Modal,
} from 'semantic-ui-react';

const UserList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { employeeList } = useSelector((state) => ({
    employeeList: state?.user?.employeeList,
  }));
  

  useEffect(() => {
    dispatch(userGetEmployeeListRequest({}));
  }, []);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const confirmDelete = (id) => {
    dispatch(userDeleteEmployeeRequest({id:id}));
    setOpen(false);
  }


  return (
    <React.Fragment>
      <h3>Employee Details</h3>
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>First Name</TableHeaderCell>
            <TableHeaderCell>Last Name</TableHeaderCell>
            <TableHeaderCell>Department</TableHeaderCell>
            <TableHeaderCell>UserName</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          { employeeList?.map((list, index) => (
            <TableRow key={index}>
              <TableCell>{list?.firstName}</TableCell>
              <TableCell>{list?.lastName}</TableCell>
              <TableCell>{list?.department}</TableCell>
              <TableCell>{list?.userName}</TableCell>
              <TableCell>
                <Button color="red" icon onClick={() => handleDeleteClick(list)}>
                  <Icon name="delete" />
                </Button>
                <Button color="blue" icon>
                  <Icon name="edit" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Modal onClose={() => setOpen(false)} open={open}>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalContent>
          <ModalDescription>
            <Header>Are you sure you want to delete this user?</Header>
            <p>
              <strong>User:</strong> {selectedUser?.firstName}{' '}
              {selectedUser?.lastName}
            </p>
          </ModalDescription>
        </ModalContent>
        <ModalActions>
          <Button color="black" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            content="Delete"
            labelPosition="right"
            icon="checkmark"
            onClick={() => {confirmDelete(selectedUser?.id)}}
            color="red"
          />
        </ModalActions>
      </Modal>

    {/* Edit Modal */}
    {/* <Modal onClose={() => setOpen(false)} open={open}>
        <ModalHeader>Confirm Edit</ModalHeader>
        <ModalContent>
          <ModalDescription>
          </ModalDescription>
        </ModalContent>
        <ModalActions>
          <Button color="black" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            content="Delete"
            labelPosition="right"
            icon="checkmark"
            onClick={confirmDelete}
            color="red"
          />
        </ModalActions>
      </Modal> */}

    </React.Fragment>
  );
};

export default UserList;
