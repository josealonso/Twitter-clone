import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { DeleteConfirmation } from "../components/DeleteConfirmation";

export default function Test() {

    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const launchDialog = () => {
        setIsAlertOpen(true);
        // setIsAlertOpen(!isAlertOpen);
        // setIsAlertOpen(isAlertOpen);
    }

    const closeDialog = () => {
        setIsAlertOpen(false);
        // setIsAlertOpen(isAlertOpen);
    }

    return (
        <div className="tw-mx-2 tw-my-2 tw-flex tw-justify-center">
            {/* <h2>PROBANDO</h2> */}
            <Button onClick={launchDialog}>
                Delete
            </Button>
            <Button onClick={closeDialog}>
                Close dialog
            </Button>

            <DeleteConfirmation isDialogOpened={isAlertOpen} 
            handleCloseDialog={closeDialog} />
            {/* handleCloseDialog={() => setIsAlertOpen(false)} /> */}
        </div>
    )
}