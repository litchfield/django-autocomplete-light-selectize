;(function ($) {
    
    function get_forwards(element) {
        var forwardElem, forwardList, prefix, forwardedData, divSelector, form;
        divSelector = "div.dal-forward-conf#dal-forward-conf-for-" +
                element.attr("id");
        form = element.length > 0 ? $(element[0].form) : $();
        forwardElem = form.find(divSelector).find('script');
        if (forwardElem.length === 0) {
            return;
        }
        try {
            forwardList = JSON.parse(forwardElem.text());
        } catch (e) {
            return;
        }

        if (!Array.isArray(forwardList)) {
            return;
        }
            
        prefix = $(element).getFormPrefix();
        forwardedData = {};

        $.each(forwardList, function(ix, f) {
            if (f["type"] === "const") {
                forwardedData[f["dst"]] = f["val"];
            } else if (f["type"] === "field") {
                var srcName, dstName;
                srcName = f["src"];
                if (f.hasOwnProperty("dst")) {
                    dstName = f["dst"];
                } else {
                    dstName = srcName;
                }
                // First look for this field in the inline
                $field = $('[name=' + prefix + srcName + ']');
                if (!$field.length)
                    // As a fallback, look for it outside the inline
                    $field = $('[name=' + srcName + ']');
                if ($field.length)
                    forwardedData[dstName] = $field.val();

            }
        });
        return JSON.stringify(forwardedData);
    }

    $(document).on('autocompleteLightInitialize', '[data-autocomplete-light-function=selectize]', function() {
        var $elem = $(this);

        // If we have a URL, setup AJAX call
        var load;
        var url = $elem.attr('data-autocomplete-light-url');
        if (url) {
            load = function(query, callback) {
                var data = {
                    q: query,
                    forward: get_forwards($elem)
                    //create: $elem.attr('data-autocomplete-light-create') && !$elem.attr('data-tags'),
                }
                if ($elem.val() instanceof Array) {
                    data['selected'] = $elem.val().join(',');
                }
                $.ajax({
                    url: url,
                    dataType: 'json',
                    delay: 250,
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
                        callback(data.results);
                    }
                });
            };
        };

        // This widget has a clear button
        $elem.find('option[value=""]').remove();

        // Bind selectize
        var $select = $elem.selectize({
            plugins: ['remove_button'],
            delimiter: $elem.attr('data-tags') ? ',' : null,
            allowEmptyOption: ! $elem.is('required'),
            preload: true,
            load: load,
            //onChange: eventHandler('onChange'),
            render: {
                option: function(data, escape) {
                    return "<div>" + data.text + "</div>";
                },
                item: function(data, escape) {
                    return "<div>" + data.text + "</div>";
                }
            }
        });

    });

    $('[data-autocomplete-light-function]:not([id*="__prefix__"])').each(function() {
        window.__dal__initialize(this);
    });
})(yl.jQuery);

