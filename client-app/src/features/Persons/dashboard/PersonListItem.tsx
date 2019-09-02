import React, { useContext } from 'react'
import { IPerson } from '../../../models/Person';
import { Segment, Icon, Button } from 'semantic-ui-react';
import PersonStore from "../../../app/stores/personStore";
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

interface IProps { 
    person: IPerson;
}

const PersonListItem: React.FC<IProps> = ({person}) => {
    const personStore = useContext(PersonStore)
    const {deletePerson} = personStore;

    const handleDelete = () => {
        deletePerson(person.id);
    }

    return (
        <Segment.Group>
            <Segment>
                <Icon name="user" /> {person.firstName} {person.lastName}
            </Segment>
            <Segment>
                <Icon name='birthday cake' /> {person.age}
            </Segment>
            <Segment>
                <Icon name="marker" /> {person.location}
            </Segment>
            <Segment clearing>
                <Button onClick={handleDelete} floated='right' color='red'>Delete</Button>
                <Button as={Link} to={`/Person/${person.id}`} floated='right' color='blue'>Edit</Button>
            </Segment>
        </Segment.Group>
    )
}

export default observer(PersonListItem)
