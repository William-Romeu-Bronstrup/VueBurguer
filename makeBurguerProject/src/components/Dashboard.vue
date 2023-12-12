<script>
import ButtonActionVue from './ButtonAction.vue'
import ErrorMessageVue from './ErrorMessage.vue'

// componente de confirmação

export default {
  name: 'Dashboard',
  components: {
    ErrorMessageVue,
    ButtonActionVue
  },
  data() {
    return {
      orders: [],
      requestOrders: 'loading',
      status: [],
      requestStatus: 'loading'
    }
  },
  methods: {
    async getOrders() {
      try {
        const req = await fetch('http://localhost:3000/burgers')

        if (req) {
          this.orders = await req.json()
          this.requestOrders = 'loaded'
        }
      } catch (error) {
        this.requestOrders = 'failed'
      }
    },
    async getStatus() {
      try {
        const req = await fetch('http://localhost:3000/status')

        if (req) {
          this.status = await req.json()
          this.requestStatus = 'loaded'
        }
      } catch (error) {
        this.requestStatus = 'failed'
      }
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

      return correctShow
    }
  },
  mounted() {
    this.getOrders()
    this.getStatus()
  }
}
</script>

<template>
  <div class="container-table" v-if="requestOrders == 'loaded'">
    <p>Quantidade de pedidos: {{ lengthOfOrders() }}</p>
    <table class="table">
      <thead class="thead">
        <tr>
          <th>ID</th>
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
          <td>{{ burger.id }}</td>
          <td>{{ burger.nome }}</td>
          <td>{{ burger.carne }}</td>
          <td>{{ burger.pao }}</td>
          <td>
            {{ options(index) }}
          </td>
          <td>{{ burger.status }}</td>
          <td class="actions">
            <select name="" id="" class="select">
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
            <ButtonActionVue text="Cancelar" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <ErrorMessageVue msg="Falha em trazer os pedidos" v-else-if="requestOrders == 'failed'" />
  <p v-else>Carregando kkkk</p>
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

.tbody tr td {
  padding: 10px;
  color: var(--color-black-80);
  font-weight: 600;
  max-width: 250px;
  text-overflow: ellipsis;
  overflow: hidden;
}

.select {
  border: 2px solid #ccc;
  border-radius: 4px;
  font-family: 'Poppins';
  font-weight: 500;
  outline: none;
  padding: 6px;
  width: fit-content;
}

.option {
  font-family: 'Poppins';
  font-weight: 500;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 55px;
  gap: 5px;
}
</style>
