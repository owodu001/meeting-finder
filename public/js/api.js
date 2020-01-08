// The API object contains methods for each kind of request we'll make
export default {
  saveExample: function(example) {
    return fetch("/api/user", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(example)
    }).then(res => res.json());
  },
  getExamples: function() {
    return fetch("/api/user").then(res => res.json());
  },
  getExample: function(id) {
    return fetch(`/api/user/${id}`).then(res => res.json());
  },
  addMeeting: function(id) {
    return fetch("/api/user/" + id, {
      method: "PUT"
    }).then(res => res.json);
  },
  deleteExample: function(id) {
    return fetch("/api/user/" + id, {
      method: "DELETE"
    }).then(res => res.json);
  }
};

export const string = "something";
