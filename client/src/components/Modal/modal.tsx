import { FC, PropsWithChildren } from "react";
import Dialog from "@mui/material/Dialog";
import { SxProps } from "@mui/system";

export interface IModalProps {
    isModalOpen: boolean;
    onModalClose: () => void;
    sx?: SxProps; // Optional sx prop for additional styles
}

export const Modal: FC<PropsWithChildren<IModalProps>> = ({ isModalOpen, onModalClose, children, sx }) => {
    return (
        <Dialog
            open={isModalOpen}
            onClose={onModalClose}
            sx={{
                "& .MuiPaper-root": {
                    borderRadius: 8,
                    padding: 4,
                    maxWidth: 600,
                    width: '100%',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    backgroundColor: '#fff',
                },
                ...sx // Apply additional styles passed via sx prop
            }}
        >
            {children}
        </Dialog>
    );
};
