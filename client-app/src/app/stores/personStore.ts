import { observable, action, computed, configure, runInAction } from "mobx";
import agent from "../api/agent";
import { createContext } from "react";
import { IPerson } from "../../models/Person";
import objectId from "../common/util/util";

configure({ enforceActions: "always" });

class PersonStore {
  @observable personRegistry = new Map();
  @observable loadedPerson: IPerson | null = null;
  @observable isLoading = false;
  @observable isSubmitting = false;
  @observable submittingId: string = "";

  @computed get persons() {
    return Array.from(this.personRegistry.values());
  }

  @action loadPersons = async () => {
    try {
      this.isLoading = true;
      const persons = await agent.Persons.list();
      runInAction("loading persons", () => {
        persons.forEach(person => {
          this.personRegistry.set(person.id, person);
        });
      });
    } catch (error) {
      console.log(error);
    }

    runInAction("finish loadPersons", () => {
      this.isLoading = false;
    });
  };

  @action updatePerson = async (person: IPerson) => {
    try {
      this.isSubmitting = true;
      await agent.Persons.update(person);
      runInAction("updating person", () => {
        this.personRegistry.set(person.id, person);
        this.loadedPerson = person;
      });
    } catch (error) {
      console.log(error);
    }

    runInAction("finish updatePerson", () => {
      this.isSubmitting = false;
    });
  };

  @action createPerson = async (person: IPerson) => {
    try {
      this.isSubmitting = true;
      person.id = objectId();
      await agent.Persons.create(person);
      runInAction("creating person", () => {
        this.loadPersons()
      });
    } catch (error) {
      console.log(error);
    }

    runInAction("finish createPerson", () => {
      this.isSubmitting = false;
    });
  };

  @action deletePerson = async (id: string) => {
    try {
      this.isSubmitting = true;
      this.submittingId = id;
      await agent.Persons.delete(id);
      runInAction("deleting person", () => {
        this.personRegistry.delete(id);
      });
    } catch (error) {
      console.log(error);
    }

    runInAction("finish deletePerson", () => {
      this.isSubmitting = false;
      this.submittingId = "";
    });
  };

  @action loadPerson = async (id: string) => {
    let person = this.personRegistry.get(id);

    if (person) {
      this.loadedPerson = person;
      return person;
    } else {
      try {
        this.isLoading = true;
        person = await agent.Persons.details(id);
        runInAction("loading person", () => {
          this.personRegistry.set(person.id, person);
          this.loadedPerson = person;
          this.isLoading = false;
        });

        return person;
      } catch (error) {
        console.log(error);
      }

      runInAction("finish loading person", () => {
        this.isLoading = false;
      });
    }
  };

  @action clearLoadedPerson = () => {
    this.loadedPerson = null;
  };
}

export default createContext(new PersonStore());
