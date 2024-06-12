const url = import.meta.env.VITE_APP_SERVERURL;

export const postFetch = async (api, data, success, error) => {
    fetch(url + api, {
        method: "POST",
        headers: { "Content-Type": "application/json", dataType: "json" },
        body: JSON.stringify(data),
    }).then((res) => {
        if (res.ok) {
            return res.json().then(success);
        }
        else {
            return res.json().then(error);
        }
    });
};

export const deleteFetch = async (api, id, success, error) => {
    fetch(url + api + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", dataType: "json" },
    }).then((res) => {
        if (res.ok) {
            return res.json().then(success(id));
        }
        else {
            return res.json().then(error);
        }
    });
};
