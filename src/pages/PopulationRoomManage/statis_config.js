export default {
    // 人口增长趋势统计图表选项
    PopleGrowthTrendOptions: {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow"
            }
            //   formatter: function(params, ticket, callback) {
            //     return params[0].axisValueLabel + ":" + params[0].data;
            //   }
        },
        toolbox: {
            feature: {
                restore: {},
                saveAsImage: {
                    backgroundColor: "#fff"
                }
            }
        },
        grid: {
            left: "3%",
            right: "5%",
            bottom: "3%",
            containLabel: true
        },
        legend: {
            data: ["人数"]
        },
        xAxis: {
            type: "category",
            data: []
        },
        yAxis: {
            type: "value",
            name: "数量",
            axisLabel: {
                show: true,
                interval: "auto",
                formatter: "{value} 人"
            }
        },
        series: [
            {
                name: "人数",
                type: "line",
                data: []
            }
        ]
    },
    // 各区域人口数量统计图表选项
    PopleRegionOptions: {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow"
            }
        },
        legend: {
            data: ["户籍人口", "流动人口"]
        },
        toolbox: {
            feature: {
                restore: {},
                saveAsImage: {
                    backgroundColor: "#fff"
                }
            }
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
        },
        xAxis: [
            {
                data: [],
                splitLine: {
                    show: false
                },
                axisLabel: {
                    interval: 0
                }
            }
        ],
        yAxis: [
            {
                name: "人数",
                type: "value",
                axisLabel: {
                    show: true,
                    interval: "auto",
                    formatter: "{value}"
                }
            }
        ],
        dataZoom: [
            {
                type: "slider",
                show: true,
                start: 0,
                end: 40
            },
            {
                type: "inside",
                xAxisIndex: 0,
                zoomOnMouseWheel: true
            }
        ],
        series: [
            {
                name: "户籍人口",
                type: "bar",
                data: [],
                yAxisIndex: 0,
                itemStyle: {
                    normal: {
                        color: "#12b256",
                        shadowColor: "rgba(216, 216, 216, 0.4)",
                        shadowBlur: 10,
                        label: {
                            show: true,
                            position: "top",
                            offset: [0, -10],
                            textStyle: {
                                fontSize: 14,
                                fontWeight: 600
                            },
                            formatter: function (params) {
                                return params.value + "人";
                            }
                        }
                    }
                }
            },
            {
                name: "流动人口",
                type: "bar",
                data: [],
                yAxisIndex: 0,
                itemStyle: {
                    normal: {
                        color: "#2678b9",
                        shadowColor: "rgba(216, 216, 216, 0.4)",
                        shadowBlur: 10,
                        label: {
                            show: true,
                            position: "top",
                            offset: [0, -10],
                            textStyle: {
                                fontSize: 14,
                                fontWeight: 600
                            },
                            formatter: function (params) {
                                return params.value + "人";
                            }
                        }
                    }
                }
            }
        ]
    },
    // 各区域人口类型占比统计图表选项
    pieOptions: {
        tooltip: {
            trigger: "item",
            formatter: "{b} : {c} 人</br> 占比{d}%"
        },
        toolbox: {
            feature: {
                restore: {},
                saveAsImage: {
                    backgroundColor: "#fff"
                }
            }
        },
        grid: {
            left: "3%",
            right: "6%",
            bottom: "3%",
            containLabel: true
        },
        legend: {
            orient: "horizontal",
            left: "center",
            top: "5%",
            data: []
        },
        series: [
            {
                name: "",
                type: "pie",
                radius: "50%",
                center: ["50%", "50%"],
                selectedMode: "single",
                label: {
                    normal: {
                        formatter: "{a|{a}}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                        backgroundColor: "#eee",
                        borderColor: "#aaa",
                        borderWidth: 1,
                        borderRadius: 4,
                        rich: {
                            a: {
                                color: "#999",
                                lineHeight: 22,
                                align: "center"
                            },
                            hr: {
                                borderColor: "#aaa",
                                width: "100%",
                                borderWidth: 0.5,
                                height: 0
                            },
                            b: {
                                fontSize: 16,
                                lineHeight: 33
                            },
                            per: {
                                color: "#eee",
                                backgroundColor: "#334455",
                                padding: [2, 4],
                                borderRadius: 2
                            }
                        }
                    }
                },
                data: []
            }
        ]
    }
}