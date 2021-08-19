<template>
  <nav class="pagination is-rounded" role="navigation" aria-label="pagination">
    <ul class="pagination-list">
      <li v-for='p in pages' :key='p'>
        <a
          :class='{"is-current": p === page }' class="pagination-link"
          :aria-label="`Page ${p}`"
          :aria-current="p === page? 'page': '' "
          @click='go(p)'
          >{{p}}</a
        >
      </li>
      <li><span class="pagination-ellipsis">&hellip;</span></li>
    </ul>
  </nav>
  <!-- <nav class="pagination is-rounded" role="navigation" aria-label="pagination">
    <a class="pagination-previous">Previous</a>
    <a class="pagination-next">Next page</a>
    <ul class="pagination-list">
      <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
      
      <li><a class="pagination-link" aria-label="Goto page 45">45</a></li>
      <li>
        <a
          class="pagination-link is-current"
          aria-label="Page 46"
          aria-current="page"
          >46</a
        >
      </li>
      <li><a class="pagination-link" aria-label="Goto page 47">47</a></li>
      <li><span class="pagination-ellipsis">&hellip;</span></li>
      <li><a class="pagination-link" aria-label="Goto page 86">86</a></li>
    </ul>
  </nav> -->
</template>

<script>
export default {
    name: 'Pager',
    props: {
        pages: {
            type: Number,
            required: true
        },
        page: {
            type: Number,
            required: true
        },
        paging: {
            type: Function,
            required: true
        }

    },
    methods: {
        go(p) {

            if(p === this.page) {
                return;
            }

            this.paging(p);

        }
    }

};
</script>