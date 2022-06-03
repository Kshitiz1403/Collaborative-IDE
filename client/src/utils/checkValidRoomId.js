const isRoomIdValid = (roomid, length = 3) => {
    try {
        const arr = roomid.split("-")

        if (arr.length !== length) return false;

        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if (element.length === 0) return false;
        }
        return true;
    }
    catch (err) {
        return false;
    }
}

export default isRoomIdValid