<template>
    <v-card>
        <v-card-title class=".vss-movable">{{ title }}</v-card-title>
        <v-card-subtitle v-if="hasValue && props.lastModified">
          <span class="font-italic">
            {{lastMeasurement()}}
            (<timeago
              :datetime="props.lastModified"
              :locale="getDateLocale(locale)"
              :converter-options="{
                includeSeconds: true,
              }"
              auto-update="5">
            </timeago>)
          </span>
        </v-card-subtitle>
        <v-card-item v-if="hasValue">
          <v-chart
            id="historyChart"
            class="chart"
            :option="chartOptions"
            :loading="loading"
            autoresize/>
        </v-card-item>
    </v-card>
</template>

<script setup>
import {computed, ref, provide, onBeforeMount} from 'vue'
import { useI18n } from 'vue-i18n'
import { getDateLocale } from '@/i18n/index.js'
import { useTheme } from 'vuetify'
import { use as chartUse} from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent, 
  ToolboxComponent,
  MarkPointComponent,
  MarkLineComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import {getChannelAllData} from '@/requests/channel_requests.js'

chartUse([
  CanvasRenderer,
  LineChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
  MarkLineComponent,
  MarkPointComponent,
]);

provide(THEME_KEY, 'dark');

const { t, locale } = useI18n({ scope: 'global', })
console.log("History widget.Locale=", locale.value)

const props = defineProps({
  projectName: String,
  deviceName: String,
  channelName: String,
  channelTitle: String,
  channelId: Number, 
  lastModified: Date,
  value: String,
  unit: String,
})

const theme = useTheme().current.value
const plotColor = theme.colors.primary
const loading = ref(false)

console.log("Theme=", theme)

const chartOptions = ref({ 
      tooltip: {
        trigger: 'axis'
      },
      legend: {},
      toolbox: {
        top: 30,
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          dataView: { readOnly: false },
          magicType: { type: ['line', 'bar'] },
          restore: {},
          saveAsImage: {}
        }
      },
      grid: {
        left: 50, // the size of title + legend + margin
      },
      xAxis: {
        type: 'time',
        boundaryGap: false,
        axisLabel: {
          hideOverlap: true
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} °C'
        }
      },
      series: [
        {
          name: 'Highest',
          type: 'line',
          data: [],
          animation: false,
          markLine: {
            data: [{ yAxis: '12', name: 'Limit', symbol: 'none' }]
          }
        },
      ]
    })

onBeforeMount(()=>{
  loadChannelData()
})

const hasValue = computed(()=>{
  if( props.value ) {
    return true
  }
  return false
})

const title = computed(()=>{
  let title = ""
  if( props.channelTitle ) {
    title = props.channelTitle
  } else if (props.deviceName ) {
    title += props.deviceName
    if( props.channelName ) {
      if( title ) {
        title += " "
      }
      title += props.channelName
    }
  }
  if( props.value ) {
    if( title ) {
      title += "  "
    }
    title += props.value
    if( props.unit ){
      title += props.unit
    }
  }  
  return title
})

function lastMeasurement() {
  console.log("lastMeasurement called")
  if( !props.lastModified ) {
    return ""
  }
  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    fractionalSecondDigits: 2
  };
  let res = props.lastModified.toLocaleString(options)
  loadChannelData()
  return res
}

function loadChannelData() {
//  loading.value = true
  getChannelAllData(props.channelId).then((channelData)=>{
//    loading.value = false
    const data = []
    channelData.forEach((currData) => {
      data.push([new Date(Date.parse(currData.TimeStamp)), parseFloat(currData.Value)])
    })
    chartOptions.value.series[0].data = data
  }).catch((error)=>{
  //  loading.value = false
    console.log("error=", error)
  })
}

</script>

<style scoped>
.chart {
  height: 300px;
}
</style>