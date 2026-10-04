(
    shopt -s nullglob

    for file in *.jpg *.jpeg *.png; do
        output="${file%.*}.webp"

        if [[ -e "$output" ]]; then
            printf 'Skipping %s: %s already exists\n' "$file" "$output"
            continue
        fi

        printf 'Converting %s -> %s\n' "$file" "$output"
        magick "$file" \
            -filter Lanczos \
            -resize '1920x1080>' \
            -quality 80 \
            -define webp:method=6 \
            "$output"
    done
)