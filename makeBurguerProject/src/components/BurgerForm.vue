<script>
import ButtonSubmitVue from './ButtonSubmit.vue'
import InputTextVue from './InputText.vue'
import MessageVue from './Message.vue'
import SelectVue from './Select.vue'

import db from '../services/firebaseConfig.js'
import { getDocs, collection } from 'firebase/firestore'

console.log(db)

export default {
  name: 'BurguerForm',
  components: {
    InputTextVue,
    SelectVue,
    ButtonSubmitVue,
    MessageVue
  },
  data() {
    return {
      inputNameValue: '',
      breadOptions: [],
      meatOptions: [],
      options: [],
      selectedBread: '',
      selectedMeat: '',
      selectedOptions: [],
      msgAfterOrder: ''
    }
  },
  methods: {
    async createBurger(e) {
      const data = {
        nome: this.inputNameValue,
        carne: this.selectedMeat,
        pao: this.selectedBread,
        opcionais: Array.from(this.selectedOptions),
        status: 'Solicitado'
      }

      const req = await fetch('http://localhost:3000/burgers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const res = await req.json()

      this.resetData()
      this.msgAfterOrder = `Pedido N° ${res.id} realizado com sucesso!`

      setTimeout(() => {
        this.msgAfterOrder = ''
      }, 3000)
    },
    async getIngredients() {
      try {
        const req = await fetch('http://localhost:3000/ingredientes')
        const data = await req.json()

        this.breadOptions = data.paes
        this.meatOptions = data.carnes
        this.options = data.opcionais
      } catch (error) {
        console.log('Error', error)
      }
    },
    resetData() {
      this.inputNameValue = ''
      this.selectedBread = ''
      this.selectedMeat = ''
      this.selectedOptions = []
    },
    async getStatus() {
      const usersCollection = collection(db, 'status')
      const querySnapshot = await getDocs(usersCollection)

      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`)
      })
    }
  },
  mounted() {
    this.getIngredients()

    this.getStatus()
  }
}
</script>

<template>
  <div id="container">
    <div style="height: 30px">
      <MessageVue msg="Pedido realizado com sucesso!" v-show="msgAfterOrder" />
    </div>

    <form @submit.prevent="createBurger($event)">
      <div id="burgerForm">
        <div class="box">
          <label for="name" class="labelInputs">Nome do cliente:</label>
          <InputTextVue
            id="name"
            name="name"
            placeholder="Digite seu nome"
            v-model.trim="inputNameValue"
            required="true"
          />
        </div>
        <div class="box">
          <label for="bread" class="labelInputs">Escolha um tipo de pão:</label>
          <!-- <SelectVue
          id="bread"
          v-model:selectedBread="selectedBread"
          v-model:breadOptions="breadOptions"
        /> -->
          <select name="ChosedBread" id="bread" class="select" v-model="selectedBread" required>
            <option disabled value="">Selecione uma opção</option>
            <option
              v-for="options in breadOptions"
              :value="options.tipo"
              :key="options.id"
              class="option"
            >
              {{ options.tipo }}
            </option>
          </select>
        </div>
        <div class="box">
          <label for="meat" class="labelInputs">Escolha uma carne:</label>
          <select name="ChosedMeat" id="meat" class="select" v-model="selectedMeat" required>
            <option disabled value="">Selecione uma opção</option>
            <option
              v-for="options in meatOptions"
              :value="options.tipo"
              :key="options.id"
              class="option"
            >
              {{ options.tipo }}
            </option>
          </select>
        </div>
        <div class="box">
          <p for="" class="labelInputs">Escolha os ingredientes:</p>
          <div class="gridOptions">
            <label :for="option.id" v-for="option in options" :key="option.id" class="checkOptions">
              <span class="checkOption">{{ option.tipo }}</span>
              <input
                type="checkbox"
                name="option"
                :id="option.id"
                :value="option.tipo"
                v-model="selectedOptions"
              />
            </label>
          </div>
        </div>
      </div>

      <div class="submitButton">
        <ButtonSubmitVue
          text="Montar!"
          :disabled="selectedBread && selectedMeat && inputNameValue ? 'false' : 'true'"
        />
      </div>
    </form>
  </div>
</template>

<style scoped>
#container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 45px;
}

#burgerForm {
  display: grid;
  grid-template-columns: repeat(2, 30vw);
  column-gap: 2em;
  row-gap: 1em;
  grid-auto-rows: auto;
  padding: 1em;
}

.box {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.select {
  padding: 10px 8px;
  border: 2px solid var(--border-inputs);
  border-radius: 4px;
  font-family: 'Poppins';
  font-weight: 500;
  outline: none;
}

.select:focus {
  border: 2px solid var(--border-select-focus);
}

.option {
  font-family: 'Poppins';
  font-weight: 500;
}

.gridOptions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;
  row-gap: 5px;
}

.checkOptions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  padding: 0px 20px 0px 0px;
}

.checkOption {
  font-family: 'Poppins';
  font-size: 14.5px;
  font-weight: 400;
}

.submitButton {
  padding: 1em;
}

@media (max-width: 767px) {
  #burgerForm {
    grid-template-columns: repeat(1, minmax(10px, 400px));
  }
}
</style>
