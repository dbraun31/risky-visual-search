function get_rt_window(acc, b0, b1) {
    // returns rt window
    y_lo = Math.log(acc / (1 - acc))
    return (y_lo - b0) / b1
}

function get_pswitch(rt_window, b0, b1) {
    // these parameters should be fixed from the data
    return b0 + rt_window * b1
}
