import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { resetFileState, setFile } from "@/features/video/videoSlice";
import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const useFileInput = ({ maxSize, type }: { maxSize: number; type: "video" | "image"; }) => {
    const [previewUrl, setPreviewUrl] = useState("");
    const [duration, setDuration] = useState(0);
    const [localFile, setLocalFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const reduxFile = useAppSelector((state) => state.video.file);
    const reduxDuration = useAppSelector((state) => state.video.duration);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (type === "video" && reduxFile) {
            const objectUrl = URL.createObjectURL(reduxFile);
            setLocalFile(reduxFile);
            setPreviewUrl(objectUrl);
            setDuration(reduxDuration);

            return () => {
                URL.revokeObjectURL(objectUrl);
            };
        }

        if (type === "video" && !reduxFile) {
            setLocalFile(null);
            setPreviewUrl("");
            setDuration(0);
        }
    }, [reduxFile, reduxDuration, type]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        const selectedFile = e.target.files[0];

        if (selectedFile.size > maxSize) {
            toast.error(`File size exceeds ${maxSize / (1024 * 1024)} MB.`);
            return;
        }

        if (
            type === "video" &&
            !selectedFile.type.startsWith("video/")
        ) {
            toast.error("Please select a video file.");
            return;
        }

        if (
            type === "image" &&
            !selectedFile.type.startsWith("image/")
        ) {
            toast.error("Please select an image file.");
            return;
        }

        if (previewUrl) URL.revokeObjectURL(previewUrl);

        const objectUrl = URL.createObjectURL(selectedFile);
        setLocalFile(selectedFile);
        setPreviewUrl(objectUrl);

        if (type === "video") {
            dispatch(setFile(selectedFile));

            const video = document.createElement("video");
            video.preload = "metadata";
            video.onloadedmetadata = () => {
                setDuration(Math.round(video.duration) || 0);
            };
            video.src = objectUrl;
        }
    };

    const resetFile = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);

        if (type === "video") {
            dispatch(resetFileState());
        }

        setLocalFile(null);
        setPreviewUrl("");
        setDuration(0);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return {
        file: localFile,
        previewUrl,
        duration,
        inputRef,
        handleFileChange,
        resetFile,
    };
};
