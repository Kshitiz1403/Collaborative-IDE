import useAxios from "./useAxios"

const useIsRoomIDPresent = (roomID) => {
    const api = useAxios();

    return new Promise((resolve, reject) => {
        api.get("/share/isValid", {
            params: {
                roomid: roomID
            }
        })
            .then(res => resolve(true))
            .catch(err => reject(false))
    })
}

export default useIsRoomIDPresent