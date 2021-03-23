const { default: axiosClient } = require("./axiosClient")

const calllogApi = {
    getAll: () => {
        const url = '/calllog'
        return axiosClient.get(url)
    },
    addCalllog: (data) => {
        const url = `/calllog`;
        return axiosClient.post(url, { ...data });
    }
}
export default calllogApi;