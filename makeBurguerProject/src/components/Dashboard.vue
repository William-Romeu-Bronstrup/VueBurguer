<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      orders: []
    }
  },
  methods: {
    async getOrders() {
      const req = await fetch('http://localhost:3000/burgers')
      this.orders = await req.json()
    }
  },
  mounted() {
    this.getOrders()
  }
}
</script>

<template>
  <div class="container-table">
    <table class="table">
      <thead>
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
        <tr v-for="burger in orders" :key="burger.id">
          <td>{{ burger.id }}</td>
          <td>{{ burger.nome }}</td>
          <td>{{ burger.carne }}</td>
          <td>{{ burger.pao }}</td>
          <td>{{ burger.opcionais }}</td>
          <td>{{ burger.status }}</td>
          <td>
            <button>Change Status</button>
            <button>Apagar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container-table {
  overflow-y: auto;
  min-height: 100px;
  margin-top: 25px;
}

.table {
  width: 100%;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.tbody {
  text-align: center;
}

.tbody tr td {
  padding: 10px;
}
</style>
