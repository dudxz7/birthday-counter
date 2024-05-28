$(function() {
    $("#birthday").datepicker({
        dateFormat: "dd/mm",
        changeMonth: true,
        changeYear: false,
        showButtonPanel: true,
        onClose: function(dateText, inst) { 
            $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay))
        },
        beforeShow: function(input, inst) {
            inst.dpDiv.addClass('hide-calendar-year')
        }
    })

    $.datepicker._updateDatepicker_original = $.datepicker._updateDatepicker
    $.datepicker._updateDatepicker = function(inst) {
        $.datepicker._updateDatepicker_original(inst)
        inst.dpDiv.addClass('hide-calendar-year')
    }
})

function calculateDays() {
    const input = document.getElementById('birthday').value
    const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])$/

    if (!datePattern.test(input)) {
        document.getElementById('result').innerText = "Por favor, insira uma data válida no formato dd/mm."
        return
    }

    const [day, month] = input.split('/')
    const today = new Date()
    let birthday = new Date(today.getFullYear(), month - 1, day)

    if (today.getMonth() === birthday.getMonth() && today.getDate() === birthday.getDate()) {
        document.getElementById('result').innerText = 'Seu aniversário é hoje! vamos comemorar!🥳🎉'
        return
    }

    if (today > birthday) {
        birthday.setFullYear(today.getFullYear() + 1)
    }

    const diffTime = birthday - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    let message = ''

    if (diffDays === 1) {
        message = `Falta 1 dia para o seu aniversário.`
    } else if (today > new Date(today.getFullYear(), month - 1, day)) {
        const daysPast = 365 - diffDays
        message = `Seu aniversário já passou faz ${daysPast} dias.`
    } else {
        message = `Faltam ${diffDays} dias para o seu aniversário.`
    }

    document.getElementById('result').innerText = message
}
