$(document).ready(function()
{
    $('body').on('change', '#command', function()
    {
        $('#output').val($(this).val());
    });
});
