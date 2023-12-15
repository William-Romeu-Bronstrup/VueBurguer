<script>
import ButtonActionVue from './ButtonAction.vue'
import ErrorMessageVue from './ErrorMessage.vue'
import ModalVue from './Modal.vue'

import {
  db,
  auth,
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where
} from '../services/firebaseConfig.js'
import { onAuthStateChanged } from 'firebase/auth'

export default {
  name: 'Dashboard',
  components: {
    ErrorMessageVue,
    ButtonActionVue,
    ModalVue
  },
  data() {
    return {
      orders: [],
      requestOrders: 'loading',
      status: [],
      requestStatus: 'loading',
      deletedOrders: false,
      openModal: false,
      burgerIdToDelete: 0
    }
  },
  methods: {
    async getOrders() {
      try {
        onAuthStateChanged(auth, async (e) => {
          if (e?.uid) {
            const orders = getDocs(query(collection(db, 'burgers'), where('userId', '==', e.uid)))

            this.orders = []

            Promise.all([orders]).then((values) => {
              values[0].forEach((doc) => {
                this.orders.push({
                  ...doc.data(),
                  id: doc.id
                })
              })

              this.requestOrders = 'loaded'
            })
          } else {
            this.$router.push('/login')
          }
        })
      } catch (error) {
        this.requestOrders = 'failed'
      }
    },
    async cancelOrder(burgerId) {
      try {
        await deleteDoc(doc(db, 'burgers', `${burgerId}`))

        this.deletedOrders = true
        this.getOrders()
      } catch (error) {
        this.deletedOrders = false
        console.log('Error inesperado:', error)
      }
    },
    async updateBurger(event, id) {
      const option = event.target.value

      try {
        await updateDoc(doc(db, 'burgers', `${id}`), {
          status: option
        })

        this.getOrders()
      } catch (error) {
        console.log('Erro inesperado', error)
      }
    },
    async getStatus() {
      const statusCollection = collection(db, 'status')
      const getStatus = await getDocs(statusCollection)

      getStatus.forEach((doc) => {
        this.status.push(doc.data())
      })
    },
    openModalToChoose(burgerId) {
      if (this.burgerIdToDelete == 0) {
        this.burgerIdToDelete = burgerId
        this.openModal = true
      }
    },
    declineChoose() {
      this.burgerIdToDelete = 0
      this.openModal = false
    },
    lengthOfOrders() {
      return this?.orders.length
    },
    options(index) {
      let array = Array.from(this?.orders?.[index].opcionais)
      let correctShow = ''

      array.filter((e, index) => {
        if (index + 1 === array.length) {
          correctShow += `${e}. `
        } else {
          correctShow += `${e}, `
        }
      })

      return correctShow == '' ? 'Nenhum' : correctShow
    },
    confirmDelete(burgerId) {
      this.cancelOrder(burgerId)
      this.declineChoose()
    }
  },
  created() {
    this.getOrders()
    this.getStatus()
  }
}
</script>

<template>
  <div class="container-table" v-if="requestOrders == 'loaded'">
    <Teleport to="body">
      <Transition name="fade">
        <ModalVue :open="openModal">
          <template v-slot:section>
            <div class="modalDetails">
              <h1>Tem certeza disso?</h1>
              <p>
                Ao cancelar um pedido ele nunca voltará.
                <span>Essa ação é irreversível!</span>
              </p>
            </div>

            <div class="confirmButtons">
              <ButtonActionVue text="Cancelar" costumizedClass="cancel" @action="declineChoose" />
              <ButtonActionVue
                text="Confirmar"
                costumizedClass="confirm"
                @action="confirmDelete(burgerIdToDelete)"
              />
            </div>
          </template>
        </ModalVue>
      </Transition>
    </Teleport>

    <div v-if="lengthOfOrders() != 0">
      <p>Quantidade de pedidos: {{ lengthOfOrders() }}</p>

      <table class="table">
        <thead class="thead">
          <tr>
            <th>Cliente</th>
            <th>Carne</th>
            <th>Pão</th>
            <th>Ingredientes</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody class="tbody">
          <tr v-for="(burger, index) in orders" :key="burger.id">
            <td>{{ burger.nome }}</td>
            <td>{{ burger.carne }}</td>
            <td>{{ burger.pao }}</td>
            <td>
              {{ options(index) }}
            </td>
            <td>{{ burger.status }}</td>
            <td class="actions">
              <div id="delimitedHeight">
                <select
                  name="statusOfOrders"
                  class="select"
                  @change="updateBurger($event, burger.id)"
                >
                  <option
                    v-for="sts in status"
                    :key="sts.id"
                    :value="sts.tipo"
                    :selected="burger.status == sts.tipo"
                    class="option"
                  >
                    {{ sts.tipo }}
                  </option>
                </select>

                <ButtonActionVue
                  text="Cancelar"
                  costumizedClass="cancel"
                  @action="openModalToChoose(burger.id)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="msgWithOutOrders">Nenhum pedido feito ainda!</p>
  </div>
  <ErrorMessageVue msg="Falha em trazer os pedidos" v-else-if="requestOrders == 'failed'" />
  <p v-else>Carregando</p>
</template>

<style scoped>
.container-table {
  overflow-y: auto;
  min-height: 100px;
  margin-top: 25px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 20px;
}

.thead {
  background-color: var(--thead-background);
}

.thead tr th {
  padding: 5px;
  color: var(--thead-color);
}

.tbody tr:nth-child(even) {
  background: var(--table-background-even);
}

.tbody tr:nth-child(odd) {
  background: var(--table-background-odd);
}

.thead tr th:first-child {
  border-top-left-radius: 4px;
}
.thead tr th:last-child {
  border-top-right-radius: 4px;
}

.tbody {
  text-align: center;
}

.tbody tr {
  width: 100%;
  background: green;
}

.tbody tr td {
  padding: 10px;
  color: var(--color-black-80);
  font-weight: 600;
  max-width: 250px;
  text-overflow: ellipsis;
  overflow: hidden;
}

.select {
  border: 2px solid var(--border-inputs);
  border-radius: 4px;
  font-family: 'Poppins';
  font-weight: 500;
  outline: none;
  padding: 6px;
  width: minmax(100px, 100%);
}

.select:focus {
  border: 2px solid var(--border-select-focus);
}

.option {
  font-family: 'Poppins';
  font-weight: 500;
}

.actions div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: minmax(100px, 100%);
  gap: 5px;
  height: 100%;
}

#delimitedHeight {
  height: 35px;
}

.confirmButtons {
  display: flex;
  gap: 10px;
  height: 35px;
}

.modalDetails {
  margin-bottom: 40px;
}

.modalDetails p {
  font-weight: 600;
  color: var(--color-subtitle);
  font-size: 16px;
}

.modalDetails p span {
  color: var(--color-error-hover);
  font-size: 15px;
  font-weight: 700;
}

.msgWithOutOrders {
  text-align: center;
  color: var(--color-subtitle);
  font-size: 16px;
  font-weight: 700;
}
</style>
