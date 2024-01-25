const fs = require("fs").promises;
const path = require("node:path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(process.cwd(), "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => {
      const parsed = JSON.parse(data);
      console.table(parsed);
    })
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const parsed = JSON.parse(data);
      const result = parsed.find((e) => e.id === contactId);
      if (!result) {
        console.log("Contact not found!");
        return;
      }
      console.table(result);
    })
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const parsed = JSON.parse(data);
      const result = parsed.filter((e) => e.id !== contactId);
      if (parsed.length === result.length) {
        console.log("Contact not found!");
        return;
      }
      fs.writeFile(contactsPath, JSON.stringify(result, null, 2))
        .then(() => console.log("Contact removed!"))
        .catch((err) => console.log(err.message));
    })
    .catch((err) => console.log(err.message));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const parsed = JSON.parse(data);
      const id = nanoid();
      const newContact = { id, name, email, phone };
      parsed.push(newContact);
      fs.writeFile(contactsPath, JSON.stringify(parsed, null, 2))
        .then(() => {
          console.table(newContact);
          console.log("Contact added!");
        })
        .catch((err) => console.log(err.message));
    })
    .catch((err) => console.log(err.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
