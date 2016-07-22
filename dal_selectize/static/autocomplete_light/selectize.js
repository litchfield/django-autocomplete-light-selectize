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
        $(this).find('option[value=""]').remove();

        $elem.selectize({
            delimiter: $elem.attr('data-tags') ? [','] : null,
            allowEmptyOption: ! $elem.is('required'),
            preload: true,
            load: function(query, callback) {
                $.ajax({
                    url: $elem.attr('data-autocomplete-light-url'),
                    dataType: 'json',
                    delay: 250,
                    //cache: true,
                    data: {
                        q: query,
                        forward: add_forwards($elem)
                    },
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

        // Handle item creation ****** NYI
        // $elem.on('change', function (e) {
        //     var data = e.params.args.data;

        //     if (data.create_id !== true)
        //         return;

        //     e.preventDefault();

        //     $.ajax({
        //         url: $elem.attr('data-autocomplete-light-url'),
        //         type: 'POST',
        //         dataType: 'json',
        //         data: {
        //             text: data.id,
        //             forward: add_forwards($elem)
        //         },
        //         beforeSend: function(xhr, settings) {
        //             xhr.setRequestHeader("X-CSRFToken", document.csrftoken);
        //         },
        //         success: function(data, textStatus, jqXHR ) {
        //             $elem.append(
        //                 $('<option>', {value: data.value, text: data.text, selected: true})
        //             );
        //             $elem.trigger('change');
        //             $elem.selectize.close();
        //         }
        //     });

        // });

    });

    // Remove this block when this is merged upstream:
    // https://github.com/selectize/selectize/pull/4249
    $(document).on('DOMSubtreeModified', '[data-autocomplete-light-function=selectize] option', function() {
        $(this).parents('select').next().find(
            '.selectize-selection--single .selectize-selection__rendered'
        ).text($(this).text());
    });
})(yl.jQuery);
