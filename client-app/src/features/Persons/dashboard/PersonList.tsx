import React, { useContext, Fragment } from 'react'
import PersonStore from "../../../app/stores/personStore";
import PersonListItem from './PersonListItem';
import { Item } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

const PersonList: React.FC = () => {
    const personStore = useContext(PersonStore);
    const { persons } = personStore;
    
    return (
        <Fragment>
            <Item.Group divided>
                {persons.map(person => (
                    <PersonListItem person={person} key={person.id} />
                ))}
            </Item.Group>
        </Fragment>
    )
}

export default observer(PersonList);
