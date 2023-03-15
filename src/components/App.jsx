import React from 'react';
import Section from './Section';
import FormComponent from './Form';
import ContactList from './ContactList';
import Filter from './Filter';

class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount(prevProps, prevState) {
    if (localStorage.getItem('contacts')) {
      this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
    } 
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = data => {
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, data]
      }
    }
      
      );
     ;
  };

  contactDeleteHandler = id => {
    this.setState(prevState => {
      const updatedArr = prevState.contacts.filter(contact => contact.id !== id)
      localStorage.setItem('contacts', JSON.stringify(updatedArr));
      return {
        contacts: updatedArr,
      };
    });
  };

  filterInputHandler = e => {
    this.setState({ filter: e.target.value });
  };

  showFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const filterToLowerCase = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterToLowerCase)
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.showFilteredContacts();
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
          paddingLeft: 200,
          paddingRight: 200,
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <h1>Phonebook</h1>
        <Section title="Add a contact">
          <FormComponent
            onFormSubmit={this.formSubmitHandler}
            contacts={contacts}
          />
        </Section>
        {contacts.length > 0 && (
          <Section title="Contacts">
            <Filter value={filter} onChange={this.filterInputHandler} />
            <ContactList
              data={filteredContacts}
              onContactDelete={this.contactDeleteHandler}
            />
          </Section>
        )}
      </div>
    );
  }
}

export { App };
