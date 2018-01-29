/**
 * This file is the "entrypoint" into your application
 */
import 'bootstrap'
import $ from 'jquery'

$(() => {
  $('[data-toggle="popover"]').popover()
})

