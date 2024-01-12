<script>
import ButtonSubmitVue from './ButtonSubmit.vue'
import InputTextVue from './InputText.vue'
import SelectVue from './Select.vue'

import { db, auth, getDocs, collection, addDoc } from '../services/firebaseConfig.js'

import { toast } from 'vue3-toastify'

export default {
  name: 'BurguerForm',
  components: {
    InputTextVue,
    SelectVue,
    ButtonSubmitVue
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
      toogleClassMessage: '',
      orderingBurger: false,
      userId: '',
      auth: null
    }
  },
  methods: {
    async createBurger(e) {
      try {
        this.orderingBurger = true

        if (this.isUserLogged) {
          this.userId = this.isUserLogged
        } else {
          toast.error('Precisa estar logado para fazer um pedido!', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_RIGHT,
            limit: 1,
            multiple: false
          })

          this.orderingBurger = false
          this.$router.push('/login')
        }

        const valided = this.validForm(this.inputNameValue, this.selectedBread, this.selectedMeat)

        if (!valided) return

        const data = {
          nome: this.inputNameValue,
          carne: this.selectedMeat,
          pao: this.selectedBread,
          opcionais: Array.from(this.selectedOptions),
          status: 'Solicitado',
          userId: this.userId
        }

        const docRef = await addDoc(collection(db, 'burgers'), data)

        if (docRef.id) {
          toast.success('Pedido realizado com sucesso!', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_RIGHT
          })

          this.resetData()
          this.orderingBurger = false
        } else {
          toast.error('Ocorreu um erro ao processar seu pedido!', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_RIGHT
          })

          this.orderingBurger = false
        }
      } catch (error) {
        toast.error('Ocorreu um erro inesperado!', {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_RIGHT
        })

        this.orderingBurger = false
      }
    },
    async getIngredients() {
      try {
        const getMeats = getDocs(collection(db, 'options', 'ingredientes', 'carnes'))
        const getBreads = getDocs(collection(db, 'options', 'ingredientes', 'paes'))
        const getOptions = getDocs(collection(db, 'options', 'ingredientes', 'opcionais'))

        Promise.all([getMeats, getBreads, getOptions]).then((values) => {
          values[0].forEach((doc) => {
            this.meatOptions.push(doc.data())
          })

          values[1].forEach((doc) => {
            this.breadOptions.push(doc.data())
          })

          values[2].forEach((doc) => {
            this.options.push(doc.data())
          })
        })
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
    validForm(name, bread, meat) {
      if (name == '' || name == undefined || name == null) {
        toast.error('Insira um nome válido!', {
          autoClose: 2000,
          limit: 1,
          multiple: false
        })

        this.orderingBurger = false

        return false
      }

      if (bread.trim() == '' || bread == undefined || bread == null) {
        toast.error('Insira um pão válido!', {
          autoClose: 2000,
          limit: 1,
          multiple: false
        })

        this.orderingBurger = false

        return false
      }

      if (meat.trim() == '' || meat == undefined || meat == null) {
        toast.error('Insira um pão válido!', {
          autoClose: 2000,
          limit: 1,
          multiple: false
        })

        this.orderingBurger = false

        return false
      }

      return true
    }
  },
  created() {
    this.getIngredients()
  },
  computed: {
    isUserLogged() {
      const { uid } = this.$store.getters.getAuth || false
      return uid
    }
  }
}
</script>

<template>
  <div id="container">
    <form method="POST" autocomplete="on" @submit.prevent="createBurger($event)">
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
          :disabled="
            selectedBread && selectedMeat && inputNameValue && !orderingBurger ? false : true
          "
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
