;(function ($) {
    
    function add_forwards(element) {
        var forward = element.attr('data-autocomplete-light-forward');
        if (forward !== undefined) {
            forward = forward.split(',');

            var prefix = $(element).getFormPrefix();
            var data_forward = {};

            for (var key in forward) {
                var name = prefix + forward[key];
                data_forward[forward[key]] = $('[name=' + name + ']').val();
            }

            return JSON.stringify(data_forward);
        }
    }

    $(document).on('autocompleteLightInitialize', '[data-autocomplete-light-function=selectize]', function() {
        var $elem = $(this);

        // This widget has a clear button
        $elem.find('option[value=""]').remove();

        $elem.selectize({
            delimiter: $elem.attr('data-tags') ? [','] : null,
            allowEmptyOption: ! $elem.is('required'),
            preload: true,
            load: function(query, callback) {
                var data = {
                    q: query,
                    forward: add_forwards($elem)
                }
                if ($elem.val()) {
                    data['selected'] = $elem.val().join(',');
                }
                $.ajax({
                    url: $elem.attr('data-autocomplete-light-url'),
                    dataType: 'json',
                    delay: 250,
                    //cache: true,
                    data: data,
                    error: function() {
                        // TODO: handle error better
                        console.log('Error calling `' + $elem.attr('name') + '` selectize AJAX endpoint');
                    },
                    success: function(data) {
                        if ($elem.attr('data-tags')) {
                            $.each(data.results, function(index, item) {
                                item.value = item.text;
                            });
                        }
                        // console.log(data);
                        callback(data.results);
                    }
                });
            },

        });

    });


})(yl.jQuery);
