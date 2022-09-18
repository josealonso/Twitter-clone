import { useRef, useState } from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button,
} from '@chakra-ui/react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../configs/firebase';

interface Props {
    isDialogOpened: boolean;
    handleCloseDialog: Function; // { () => ()}
    // willBeDeleted: boolean
    id: number;
}

export function DeleteConfirmation({ isDialogOpened, handleCloseDialog, id }: Props) {

    const [isAlertOpen, setIsAlertOpen] = useState(false);

    // const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const onDelete = () => {
        console.log("Post has been DELETED");
        handleCloseDialog();
        // willBeDeleted = true;
        deleteDoc(doc(db, "posts", id));
        console.log("Post has been CLOSED");

        // isDialogOpened=false;
        // onClose();
    }

    return (
        <>

            {/* <Button colorScheme='red' onClick={onOpen}>
                Delete Post
            </Button> */}

            <AlertDialog
                // isOpen={isOpen}
                isOpen={isDialogOpened}
                leastDestructiveRef={cancelRef}
            // onClose={handleCloseDialog}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Post
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            {/* <Button ref={cancelRef} onClick={onClose}> */}
                            <Button ref={cancelRef} onClick={handleCloseDialog}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={onDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
