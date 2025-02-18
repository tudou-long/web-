<template>
  <div style="box-sizing: border-box; overflow-y: hidden; overflow-x: hidden;">
    <el-row :gutter="20">
      <!-- 门票销售额 -->
      <el-col :span="12">
        <div class="chart-card">
          <h3>门票销售额</h3>
          <LineChart height="280px" @on-selected="ticketSelected"
                     :values="ticketMoneyValues" :date="ticketMoneyDates" />
        </div>
      </el-col>
      <!-- 酒店销售额 -->
      <el-col :span="12">
        <div class="chart-card">
          <h3>酒店销售额</h3>
          <LineChart height="280px" @on-selected="hotelOrderSelected"
                     :values="hotelRoomMoneyValues" :date="hotelRoomMoneyDates" />
        </div>
      </el-col>
    </el-row>
    <!-- 最新攻略 -->
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="24">
        <div class="strategy-card">
          <h3>最新攻略</h3>
          <div class="strategy-list">
            <div class="strategy-item" v-for="(strategy, index) in scenicStrategies" :key="index">
              <div class="left">
                <img :src="strategy.cover" :alt="strategy.title" srcset="">
              </div>
              <div class="right">
                <div class="user">
                  <img :src="strategy.userAvatar" alt="" srcset="">
                  <span>{{ strategy.userName }}</span>
                </div>
                <div class="title">{{ strategy.title }}</div>
                <div class="info">
                  <span>{{ strategy.scenicName }}</span>
                  <span>{{ timeOut(strategy.createTime) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart";
import { timeAgo } from "@/utils/data";

export default {
  components: { LineChart },
  data() {
    return {
      staticData: [],
      scenicStrategies: [],
      ticketMoneyValues: [],
      ticketMoneyDates: [],
      hotelRoomMoneyValues: [],
      hotelRoomMoneyDates: [],
      defaultQueryDays: 365, // 由于数据太少，直接查一年来测试
    };
  },
  created() {
    this.fentchStaticCount();
    this.fentchStrategy();
    this.ticketSelected(this.defaultQueryDays);
    this.hotelOrderSelected(this.defaultQueryDays);
  },
  methods: {
    timeOut(time) {
      return timeAgo(time);
    },
    // 查询指定时间内的门票销售额记录
    hotelOrderSelected(day) {
      this.$axios.get(`/hotelOrderInfo/daysQueryMoney/${day}`).then(res => {
        if (res.data.code === 200) {
          // 只取出里面的金额，自成一个数组
          this.hotelRoomMoneyValues = res.data.data.map(money => money.count);
          // 只取出里面的日期，自成一个数组
          this.hotelRoomMoneyDates = res.data.data.map(money => money.name);
        }
      });
    },
    // 查询指定时间内的门票销售额记录
    ticketSelected(day) {
      this.$axios.get(`/scenicTicketOrder/daysQueryMoney/${day}`).then(res => {
        if (res.data.code === 200) {
          // 只取出里面的金额，自成一个数组
          this.ticketMoneyValues = res.data.data.map(money => money.count);
          // 只取出里面的日期，自成一个数组
          this.ticketMoneyDates = res.data.data.map(money => money.name);
        }
      });
    },
    // 查询最新发布的攻略数据
    fentchStrategy() {
      const strategyQuery = {
        current: 1,
        size: 6
      };
      this.$axios.post('/scenicStrategy/queryList', strategyQuery).then(res => {
        if (res.data.code === 200) {
          this.scenicStrategies = res.data.data;
        }
      });
    },
    // 查询静态数据
    fentchStaticCount() {
      this.$axios.get('/views/staticControls').then(res => {
        if (res.data.code === 200) {
          this.staticData = res.data.data;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.chart-card, .strategy-card {
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  background-color: #fff;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  h3 {
    margin-bottom: 10px;
    font-size: 22px;
    font-weight: bold;
  }
}

.strategy-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.strategy-item {
  display: flex;
  align-items: center;
  width: calc(50% - 10px); /* 使每个攻略项占据一半的宽度，并留出间隔 */
  cursor: pointer;

  .left {
    padding: 5px;
    box-sizing: border-box;

    img {
      width: 138px;
      height: 80px;
      border-radius: 5px;
    }
  }

  .right {
    padding: 5px;
    box-sizing: border-box;
    flex: 1;

    .user {
      display: flex;
      justify-content: left;
      align-items: center;
      margin-block: 4px;

      img {
        width: 20px;
        height: 20px;
        border-radius: 10px;
      }

      span {
        margin-left: 4px;
        font-size: 14px;
      }
    }

    .title {
      font-size: 20px;
      font-weight: 800;
      padding-bottom: 6px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .info {
      font-size: 12px;
      margin-top: 10px;
      display: flex;
      justify-content: left;
      gap: 10px;

      span:first-child {
        display: inline-block;
        padding: 1px 3px;
        border-radius: 2px;
        background-color: rgb(237, 243, 249);
        color: rgb(136, 115, 233);
      }
    }
  }
}
</style>